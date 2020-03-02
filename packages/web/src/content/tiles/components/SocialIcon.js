import React from 'react';
import FacebookSocial from '../../../common/icons/FacebookSocial';
import TwitterSocial from '../../../common/icons/TwitterSocial';
import InstagramSocial from '../../../common/icons/InstagramSocial';

export default ({ partner: { name = '' } = {}, className }) => {
  switch (name.toLowerCase()) {
    case 'facebook':
      return <FacebookSocial className={className} />;
    case 'instagram':
      return <InstagramSocial className={className} />;
    case 'twitter':
      return <TwitterSocial className={className} />;
    default:
      console.warn('Unknown social partner');
      return null;
  }
};
