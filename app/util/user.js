function getGroup(userData, groupName) {
    return (
        userData.user &&
        userData.user.groups &&
        userData.user.groups.indexOf(groupName) !== -1
    );
}

export function getUserMetadata(userData) {
    return {
        isLoggedIn: userData.isLoggedIn === true,
        isEmailVerified: userData.isEmailVerified === true,
        isAdmin: getGroup(userData, 'admin'),
    };
}