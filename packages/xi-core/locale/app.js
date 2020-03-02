import { defineMessages } from 'react-intl';

export default defineMessages({
  required: {
    id: 'app.required',
    defaultMessage: 'Please complete',
  },
  invalid_email: {
    id: 'app.invalid_email',
    defaultMessage: "This email address doesn't seem right. Please try again.",
  },
  discover: {
    id: 'app.discover',
    defaultMessage: 'Discover',
  },
  players: {
    id: 'app.players',
    defaultMessage: 'Players',
  },
  search: {
    id: 'app.search',
    defaultMessage: 'Search',
  },
  myProfile: {
    id: 'app.my_profile',
    defaultMessage: 'My Profile',
  },
  submit_error: {
    id: 'submit_error',
    defaultMessage: 'Something went wrong, please try again later.',
  },
});

export const videoButtons = defineMessages({
  go_unlimited_CTA: {
    id: 'video.go_unlimited_CTA',
    defaultMessage: 'Go Unlimited',
  },
  watch_trailer_CTA: {
    id: 'video.watch_trailer_CTA',
    defaultMessage: 'Watch Trailer',
  },
  join_now_CTA: {
    id: 'video.join_now_CTA',
    defaultMessage: 'Join Now',
  },
});
