const RushImg = require('../../static/home-page/rush.jpg');
const SocialGrowthImg = require('../../static/home-page/social-growth.jpg');
const ProfessionalDevelopmentImg = require('../../static/home-page/professional-development.jpg');
const TechnicalAdvancementImg = require('../../static/home-page/technical-advancement.jpg');
const AlumniConnectionsImg = require('../../static/home-page/alumni-connections.jpg');
const AcademicSupportImg = require('../../static/home-page/academic-support.jpg');

export const getHomePageCards = () => [
  {
    key: 0,
    title: 'Rush',
    body: 'Rush',
    img: RushImg,
  },
  {
    key: 1,
    title: 'Social Growth',
    body: 'Rush',
    img: SocialGrowthImg,
  },
  {
    key: 2,
    title: 'Professional Development',
    body: 'Rush',
    img: ProfessionalDevelopmentImg,
  },
  {
    key: 3,
    title: 'Technical Advancement',
    body: 'Rush',
    img: TechnicalAdvancementImg,
  },
  {
    key: 4,
    title: 'Alumni Connections',
    body: 'Rush',
    img: AlumniConnectionsImg,
  },
  {
    key: 5,
    title: 'Academic Support',
    body: 'Rush',
    img: AcademicSupportImg,
  },
];
