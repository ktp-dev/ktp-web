import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ProfileThunks } from '../actions';
import { FieldTypes, ProfileFields } from '../constants/forms';
import { getUserMetadata } from '../util/user.js';

import {
    PageContainer,
    FileUpload,
    Alert,
    Input,
    LabeledInput,
    RoundedButton
} from '../components';

import { NotificationStack } from 'react-notification';
import { OrderedSet } from 'immutable';

const FullscreenColumnContainer = styled.div`
    maxWidth: 500px;
    margin: 0 auto;
    minHeight: calc(100vh - 30px - 2rem - 80px);
    padding: 20px 20px 50px 20px;
`;

const Flexer = styled.div`
    display: flex;
    flexDirection: column;
`;

const InputContainer = styled.div`marginBottom: 30px;`;

const ButtonGroup = styled.div`
    display: flex;
    flexDirection: row;
    justifyContent: space-between;
`;

const SectionHeader = styled.h2`
    textTransform: uppercase;
    fontSize: 24px;
    color: ${props => props.color};
    margin: 0;
`;

const SubsectionHeader = styled.h3`
    fontSize: 22px;
    color: ${props => props.color};
    fontWeight: 500;
    margin: 26px 0 0 0;
`;

const FileUploadContainer = styled.div`marginTop: 10px;`;

const AlertContainer = styled.div`marginTop: 30px;`;

const Link = styled.a`
    color: ${props => props.color};
    cursor: pointer;
`;

const autocompleteMenuStyle = {
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    fontSize: '90%',
    position: 'absolute',
    maxHeight:
        Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
        ) /
            2 +
        'px',
    left: '20px',
    top: '45px',
    overflow: 'auto',
    zIndex: 101
};

class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        const userData = this.props.userState.data.user;
        this.state = {
            birthday: userData.birthday
                ? new Date(userData.birthday).toISOString().split('T')[0]
                : '',
            university: userData.university || '',
            major: userData.major || '',
            avatars: userData.avatars || [],
            isResumeUploaded: userData.isResumeUploaded || false,
            notifications: OrderedSet()
        };

        for (const key of Object.keys(ProfileFields)) {
            if (
                ProfileFields[key] === FieldTypes.TEXT ||
                ProfileFields[key] === FieldTypes.LINK
            ) {
                this.state[key] = userData[key] || '';
            } else if (ProfileFields[key] === FieldTypes.SELECT) {
                this.state[key] = userData[key] || 'unselected';
            } else if (ProfileFields[key] === FieldTypes.DATE) {
                this.state[key] = userData[key]
                    ? new Date(userData[key]).toISOString().split('T')[0]
                    : '';
            }
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleAttributeChange = this.handleAttributeChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handlePictureUpload = this.handlePictureUpload.bind(this);
        this.onClickRequestEmailVerification = this.onClickRequestEmailVerification.bind(
            this
        );
        this.handleSortItems = this.handleSortItems.bind(this);
        this.handleItemShouldRender = this.handleItemShouldRender.bind(this);
        this.handleRenderMenu = this.handleRenderMenu.bind(this);
    }

    addNotification(message, key, action) {
        return this.setState({
            notifications: this.state.notifications.add({
                message,
                key,
                action: action || 'Dismiss',
                onClick: (notification, deactivate) => {
                    deactivate();
                    this.removeNotification(key);
                },
                dismissAfter: 5000
            })
        });
    }

    removeNotification(key) {
        this.setState({
            notifications: this.state.notifications.filter(n => n.key !== key)
        });
    }

    componentDidMount() {
        this.props.dispatch(ProfileThunks.loadProfile());
    }

    componentWillReceiveProps(nextProps) {
        const userData = this.props.userState.data.user;
        const nextUserData = nextProps.userState.data.user;

        if (nextProps.userState.fetching) {
            return;
        }

        var updateData = {};
        for (var i in userData) {
            if (i in nextUserData && nextUserData[i] !== userData[i]) {
                if (i === 'birthday') {
                    nextUserData[i] = nextUserData.birthday
                        ? new Date(nextUserData.birthday)
                              .toISOString()
                              .split('T')[0]
                        : '';
                }

                updateData[i] = nextUserData[i];
            }
        }

        if (!('isResumeUploaded' in updateData)) {
            updateData.isResumeUploaded = false;
        }

        this.setState(updateData);
    }

    // Generic function for changing state
    // -- input using this must have a name attribute
    handleAttributeChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFileUpload(file) {
        this.setState({
            resume: file
        });
    }

    handlePictureUpload(file) {
        this.setState({
            avatar: file
        });
    }

    handleSortItems(a, b, value) {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        const valueLower = value.toLowerCase();
        const queryPosA = aLower.indexOf(valueLower);
        const queryPosB = bLower.indexOf(valueLower);
        if (queryPosA !== queryPosB) {
            return queryPosA - queryPosB;
        }
        return aLower < bLower ? -1 : 1;
    }

    handleItemShouldRender(current, value) {
        return current.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }

    handleRenderMenu(items, value, style) {
        return (
            <div
                style={{ ...style, ...autocompleteMenuStyle }}
                children={
                    value.length > 2 ? items : 'Start typing for autocomplete'
                }
            />
        );
    }

    onSubmit(e) {
        e.preventDefault();

        var profile = {};
        var files = {};

        if (this.state.resume) {
            files['resume'] = this.state.resume;
        }
        if (this.state.avatar) {
            files['avatar'] = this.state.avatar;
        }

        for (const key of Object.keys(ProfileFields)) {
            if (key === 'name') {
                profile[key] = this.state[key];
                profile['full_name'] = this.state[key];
            } else if (
                ProfileFields[key] === FieldTypes.TEXT ||
                ProfileFields[key] === FieldTypes.LINK ||
                ProfileFields[key] === FieldTypes.SELECT
            ) {
                profile[key] = this.state[key];
            } else if (ProfileFields[key] === FieldTypes.DATE) {
                profile[key] = new Date(this.state[key]).getTime();
            }
        }

        this.props.dispatch(ProfileThunks.updateProfile(profile, files));

        this.addNotification('Profile Saved!', 'save');
    }

    onClickRequestEmailVerification(e) {
        e.preventDefault();

        var email = this.props.userState.data.user.email;

        this.props.dispatch(ProfileThunks.sendVerificationEmail(email));
    }

    renderEmailVerificationPage() {
        const userData = this.props.userState.data;
        return (
            <PageContainer>
                <FullscreenColumnContainer>
                    <SectionHeader color={this.props.theme.primary}>
                        Unverified Email
                    </SectionHeader>
                    <p>
                        You should have received a verification email at{' ' + userData.user.email}.
                        If not, you can request another one by clicking{' '}
                        <Link
                            onClick={this.onClickRequestEmailVerification}
                            color={this.props.theme.highlight}
                        >
                            here
                        </Link>. After you verify your email you can continue
                        setting up your profile!
                    </p>
                </FullscreenColumnContainer>
            </PageContainer>
        );
    }

    render() {
        const userData = this.props.userState.data;
        const { isEmailVerified } = getUserMetadata(userData);

        if (!isEmailVerified) {
            return this.renderEmailVerificationPage();
        }

        return (
            <PageContainer>
                <FullscreenColumnContainer>
                    <SectionHeader color={this.props.theme.primary}>
                        Edit Profile
                    </SectionHeader>
                    <form onSubmit={this.onSubmit}>
                        {this.props.userState.error ? (
                            <AlertContainer>
                                <Alert message={this.props.userState.message} />
                            </AlertContainer>
                        ) : null}
                        <Flexer>
                            <InputContainer>
                                <SubsectionHeader
                                    color={this.props.theme.primary}
                                >
                                    General
                                </SubsectionHeader>
                                <LabeledInput label="Name">
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={this.props.name}
                                        onChange={this.handleAttributeChange}
                                    />
                                </LabeledInput>
                                <LabeledInput label="Major(s)">
                                    <Input
                                        id="major"
                                        type="text"
                                        name="major"
                                        value={this.props.major}
                                        onChange={this.handleAttributeChange}
                                    />
                                </LabeledInput>
                                <FileUploadContainer>
                                    <FileUpload
                                        fileTitle="Resume"
                                        defaultColor={
                                            userData.user.isResumeUploaded ? (
                                                this.props.theme.success
                                            ) : (
                                                this.props.theme.primary
                                            )
                                        }
                                        hoverColor={this.props.theme.secondary}
                                        activeColor={this.props.theme.success}
                                        onFileSelect={this.handleFileUpload}
                                        defaultText={
                                            userData.user.isResumeUploaded ? (
                                                'Resume Uploaded'
                                            ) : null
                                        }
                                    />
                                </FileUploadContainer>
                                <FileUploadContainer>
                                    <FileUpload
                                        fileTitle="Profile Picture"
                                        defaultColor={
                                            this.state.avatars.length > 2 ? (
                                                this.props.theme.success
                                            ) : (
                                                this.props.theme.primary
                                            )
                                        }
                                        hoverColor={this.props.theme.secondary}
                                        activeColor={this.props.theme.success}
                                        onFileSelect={this.handlePictureUpload}
                                        defaultText={
                                            this.state.avatars.length > 2 ? (
                                                'Profile Picture Uploaded'
                                            ) : null
                                        }
                                    />
                                </FileUploadContainer>
                                <SubsectionHeader
                                    color={this.props.theme.primary}
                                >
                                    Links
                                </SubsectionHeader>
                                <LabeledInput label="GitHub">
                                    <Input
                                        id="github"
                                        type="text"
                                        name="github"
                                        placeholder="https://github.com/"
                                        value={this.state.github}
                                        onChange={this.handleAttributeChange}
                                    />
                                </LabeledInput>
                                <LabeledInput label="LinkedIn">
                                    <Input
                                        id="linkedin"
                                        type="text"
                                        name="linkedin"
                                        placeholder="https://www.linkedin.com/in/"
                                        value={this.state.linkedin}
                                        onChange={this.handleAttributeChange}
                                    />
                                </LabeledInput>
                                <LabeledInput label="Portfolio">
                                    <Input
                                        id="portfolio"
                                        type="text"
                                        name="portfolio"
                                        placeholder="https://"
                                        value={this.state.portfolio}
                                        onChange={this.handleAttributeChange}
                                    />
                                </LabeledInput>
                            </InputContainer>
                            <ButtonGroup>
                                <RoundedButton
                                    type="submit"
                                    color={this.props.theme.primary}
                                >
                                    Save
                                </RoundedButton>
                            </ButtonGroup>
                        </Flexer>
                    </form>
                </FullscreenColumnContainer>
                <NotificationStack
                    notifications={this.state.notifications.toArray()}
                    onDismiss={notification =>
                        this.setState({
                            notifications: this.state.notifications.delete(
                                notification
                            )
                        })}
                />
            </PageContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        userState: state.userState,
        theme: state.theme.data
    };
}

export default connect(mapStateToProps)(EditProfile);
