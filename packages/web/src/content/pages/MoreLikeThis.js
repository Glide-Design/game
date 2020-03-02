import React from 'react';
import { compose } from 'lodash/fp';
import { FormattedMessage } from 'react-intl';
import { fetchRelatedContentSection } from 'xi-core/content/actions';
import { getRelatedContent } from 'xi-core/content/selectors';
import withRequest from 'xi-core/withRequest';
import Card from '../components/Card';
import CardSection from '../components/CardSection';

const related = {
  content: [
    {
      externalId: 'paulo-unmasked',
      contentContributors: [
        {
          forename: 'Paulo',
          seoCode: 'paulodybala',
          surname: 'Dybala',
          mediaGroup: [
            {
              usage: 'PROFILE',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--UFVP3ITo--/v1561386276/app/stars/paulodybala/player-index/player-index-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--PYqrjhyB--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--omVyPq1x--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O8pwhSyp--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--RJsRgoTR--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---WEiGhDa--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Rj4wLy4g--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--NcORKOTo--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--VmScKwlJ--/v1561386274/app/stars/paulodybala/player-index/player-index-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ktepon8K--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--T8bw45Ky--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--w31M59U2--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--c1zcVQlB--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--uKoY5q89--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_jloW88O--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XaE169xg--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--cyWkZuYV--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-2',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--rBVX3x0B--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_IgeYBOk--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xc5D_NqC--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Qs-BDG00--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--osyv-qux--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r7XPoMyv--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--q4spcb6j--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Cff2KjJi--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vvX-XH0x--/c_scale,w_3839/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--P966A23d--/c_scale,w_1920/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--pI2Q4AE3--/c_scale,w_960/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--riogy0jw--/c_scale,w_480/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--3Wb1rnOy--/c_scale,w_240/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UeO0tCCc--/c_scale,w_120/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--okY8yuOe--/c_scale,w_60/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                  ],
                },
              ],
            },
            {
              usage: 'BIO',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--fkGJvJdz--/v1561386272/app/stars/paulodybala/bio-background/bio-background-paulodybala-5.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--hNexAXHB--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kZmy-Vgy--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kBiVrv9S--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--lj3tasyI--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--icC2aigW--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r_NgvEWz--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--iOs9urG0--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--8deYo15Z--/v1561386270/app/stars/paulodybala/bio-background/bio-background-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--TCbBv8lE--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--nbhqjDvp--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vo57bFra--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--fzCG5iOA--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--cEJVT6cE--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--BYN8rYih--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XUgnS3v3--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Ycq4OTYZ--/v1561386269/app/stars/paulodybala/bio-background/bio-background-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eKsUIK_6--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XVoS3SED--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ffE2mMY0--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O1sAzewc--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UXxukzem--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4gwVpkKS--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--k8ubPyMc--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--zOPbIWsG--/v1561386268/app/stars/paulodybala/bio-background/bio-background-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eQvcSAa9--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--GfAOQfz8--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kNF5AOEN--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4yzd5fNz--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Nbm2VxGE--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---KmtotUO--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--I11FP2s0--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Sg7f68xZ--/v1561386267/app/stars/paulodybala/bio-background/bio-background-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--zxZQqAX7--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--44EUg7Df--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--QYrdfya2--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kj-2j_Q6--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--wDB6AbJr--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--drDPCeB0--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--CH6RxPEp--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Signature',
                  width: 400,
                  height: 400,
                  format: 'png',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--9qGlnRGo--/v1561386266/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1.png',
                  public_id: 'app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                  media: [
                    {
                      width: 399,
                      height: 399,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ojTLJ81q--/c_scale,w_399/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 200,
                      height: 200,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--AXfFNkin--/c_scale,w_200/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 100,
                      height: 100,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--KJmHxBjP--/c_scale,w_100/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 50,
                      height: 50,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xkyIgZ-6--/c_scale,w_50/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                  ],
                },
              ],
            },
          ],
          starType: 'Footballer',
          externalId: 'paulodybala',
          bio:
            "I wanted to quit football when I was just 15. I had lost my dad to cancer and it felt like the end of the world. I kept going to make up for all the sacrifices he had made for me, and now every time I score I point to the sky to say thank you. When you're a footballer, people judge you without knowing who you really are. I want to change that.",
          avatar:
            'https://res.cloudinary.com/our-star-club/image/authenticated/s--0d043K3P--/v1/app/stars/paulodybala/avatar/avatar-paulodybala',
          starExternalId: 'paulodybala',
        },
      ],
      description:
        'Paulo Dybala takes you back to the darkest five days of his career to explain the origins of his famous mask goal celebration.',
      descriptionBrief:
        'Paulo Dybala takes you back to the darkest five days of his career to explain the origins of his famous mask goal celebration.',
      title: 'Paulo Unmasked',
      titleBrief: 'Unmasked',
      language: 'en',
      tags: [],
      creatives: [
        {
          mediaUsageType: 'Artwork',
          width: 3205,
          height: 1803,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--VN9emTJw--/v1565879445/app/content/paulo-unmasked/paulo-unmasked-4.jpg',
          public_id: 'app/content/paulo-unmasked/paulo-unmasked-4',
          media: [
            {
              width: 3204,
              height: 1802,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--lgLFpH-2--/c_scale,w_3204/v1/app/content/paulo-unmasked/paulo-unmasked-4',
            },
            {
              width: 1602,
              height: 901,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--m5BDAO6u--/c_scale,w_1602/v1/app/content/paulo-unmasked/paulo-unmasked-4',
            },
            {
              width: 801,
              height: 451,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--NAyEurss--/c_scale,w_801/v1/app/content/paulo-unmasked/paulo-unmasked-4',
            },
            {
              width: 401,
              height: 226,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--yBpBgSP1--/c_scale,w_401/v1/app/content/paulo-unmasked/paulo-unmasked-4',
            },
            {
              width: 201,
              height: 113,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--TQYQGZ2E--/c_scale,w_201/v1/app/content/paulo-unmasked/paulo-unmasked-4',
            },
            {
              width: 101,
              height: 57,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ZiZ89vbY--/c_scale,w_101/v1/app/content/paulo-unmasked/paulo-unmasked-4',
            },
            {
              width: 51,
              height: 29,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Gg_fr8LC--/c_scale,w_51/v1/app/content/paulo-unmasked/paulo-unmasked-4',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 2197,
          height: 2197,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--P18JVo0M--/v1565879444/app/content/paulo-unmasked/paulo-unmasked-2.jpg',
          public_id: 'app/content/paulo-unmasked/paulo-unmasked-2',
          media: [
            {
              width: 2196,
              height: 2196,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--PvVOaAtG--/c_scale,w_2196/v1/app/content/paulo-unmasked/paulo-unmasked-2',
            },
            {
              width: 1098,
              height: 1098,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--mr2EOjVw--/c_scale,w_1098/v1/app/content/paulo-unmasked/paulo-unmasked-2',
            },
            {
              width: 549,
              height: 549,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--xXgBqn5v--/c_scale,w_549/v1/app/content/paulo-unmasked/paulo-unmasked-2',
            },
            {
              width: 275,
              height: 275,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--dHIpAlWv--/c_scale,w_275/v1/app/content/paulo-unmasked/paulo-unmasked-2',
            },
            {
              width: 138,
              height: 138,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s---TT9CcgX--/c_scale,w_138/v1/app/content/paulo-unmasked/paulo-unmasked-2',
            },
            {
              width: 69,
              height: 69,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--cGTbh4X2--/c_scale,w_69/v1/app/content/paulo-unmasked/paulo-unmasked-2',
            },
            {
              width: 35,
              height: 35,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--qwkyHgrc--/c_scale,w_35/v1/app/content/paulo-unmasked/paulo-unmasked-2',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1687,
          height: 2197,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--15u6tsQ9--/v1565879444/app/content/paulo-unmasked/paulo-unmasked-3.jpg',
          public_id: 'app/content/paulo-unmasked/paulo-unmasked-3',
          media: [
            {
              width: 1686,
              height: 2196,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Hm92FtGK--/c_scale,w_1686/v1/app/content/paulo-unmasked/paulo-unmasked-3',
            },
            {
              width: 843,
              height: 1098,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--C2xioNi7--/c_scale,w_843/v1/app/content/paulo-unmasked/paulo-unmasked-3',
            },
            {
              width: 422,
              height: 549,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--flBzzGPp--/c_scale,w_422/v1/app/content/paulo-unmasked/paulo-unmasked-3',
            },
            {
              width: 211,
              height: 275,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--av_zeTOL--/c_scale,w_211/v1/app/content/paulo-unmasked/paulo-unmasked-3',
            },
            {
              width: 106,
              height: 138,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--YMU4TNZi--/c_scale,w_106/v1/app/content/paulo-unmasked/paulo-unmasked-3',
            },
            {
              width: 53,
              height: 69,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--NF8V3J_G--/c_scale,w_53/v1/app/content/paulo-unmasked/paulo-unmasked-3',
            },
            {
              width: 27,
              height: 35,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ESt6aOIB--/c_scale,w_27/v1/app/content/paulo-unmasked/paulo-unmasked-3',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1543,
          height: 2197,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--gREVUSIc--/v1565879444/app/content/paulo-unmasked/paulo-unmasked-1.jpg',
          public_id: 'app/content/paulo-unmasked/paulo-unmasked-1',
          media: [
            {
              width: 1542,
              height: 2196,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--EL45beHk--/c_scale,w_1542/v1/app/content/paulo-unmasked/paulo-unmasked-1',
            },
            {
              width: 771,
              height: 1098,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ES9qBSPz--/c_scale,w_771/v1/app/content/paulo-unmasked/paulo-unmasked-1',
            },
            {
              width: 386,
              height: 549,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--51MLOs_w--/c_scale,w_386/v1/app/content/paulo-unmasked/paulo-unmasked-1',
            },
            {
              width: 193,
              height: 275,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--4AgW5m-K--/c_scale,w_193/v1/app/content/paulo-unmasked/paulo-unmasked-1',
            },
            {
              width: 97,
              height: 138,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--gJNCH94d--/c_scale,w_97/v1/app/content/paulo-unmasked/paulo-unmasked-1',
            },
            {
              width: 49,
              height: 69,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--F5Je-bpQ--/c_scale,w_49/v1/app/content/paulo-unmasked/paulo-unmasked-1',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 3123,
          height: 1463,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--YwBvWuiv--/v1565879444/app/content/paulo-unmasked/paulo-unmasked-5.jpg',
          public_id: 'app/content/paulo-unmasked/paulo-unmasked-5',
          media: [
            {
              width: 3122,
              height: 1463,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--I_-_g7Ur--/c_scale,w_3122/v1/app/content/paulo-unmasked/paulo-unmasked-5',
            },
            {
              width: 1561,
              height: 732,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--W1XKeI2s--/c_scale,w_1561/v1/app/content/paulo-unmasked/paulo-unmasked-5',
            },
            {
              width: 781,
              height: 366,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--APNagn26--/c_scale,w_781/v1/app/content/paulo-unmasked/paulo-unmasked-5',
            },
            {
              width: 391,
              height: 183,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--SaynPSQb--/c_scale,w_391/v1/app/content/paulo-unmasked/paulo-unmasked-5',
            },
            {
              width: 196,
              height: 92,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--TnSjKiD4--/c_scale,w_196/v1/app/content/paulo-unmasked/paulo-unmasked-5',
            },
            {
              width: 98,
              height: 46,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--cG5FNP0t--/c_scale,w_98/v1/app/content/paulo-unmasked/paulo-unmasked-5',
            },
            {
              width: 49,
              height: 23,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--yyQ11lsP--/c_scale,w_49/v1/app/content/paulo-unmasked/paulo-unmasked-5',
            },
          ],
        },
      ],
      contentTypeName: 'Video',
      duration: 106.28,
    },
    {
      externalId: 'otro-asks-dybala',
      contentContributors: [
        {
          forename: 'Paulo',
          seoCode: 'paulodybala',
          surname: 'Dybala',
          mediaGroup: [
            {
              usage: 'PROFILE',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--UFVP3ITo--/v1561386276/app/stars/paulodybala/player-index/player-index-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--PYqrjhyB--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--omVyPq1x--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O8pwhSyp--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--RJsRgoTR--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---WEiGhDa--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Rj4wLy4g--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--NcORKOTo--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--VmScKwlJ--/v1561386274/app/stars/paulodybala/player-index/player-index-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ktepon8K--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--T8bw45Ky--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--w31M59U2--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--c1zcVQlB--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--uKoY5q89--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_jloW88O--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XaE169xg--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--cyWkZuYV--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-2',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--rBVX3x0B--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_IgeYBOk--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xc5D_NqC--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Qs-BDG00--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--osyv-qux--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r7XPoMyv--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--q4spcb6j--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Cff2KjJi--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vvX-XH0x--/c_scale,w_3839/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--P966A23d--/c_scale,w_1920/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--pI2Q4AE3--/c_scale,w_960/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--riogy0jw--/c_scale,w_480/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--3Wb1rnOy--/c_scale,w_240/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UeO0tCCc--/c_scale,w_120/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--okY8yuOe--/c_scale,w_60/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                  ],
                },
              ],
            },
            {
              usage: 'BIO',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--fkGJvJdz--/v1561386272/app/stars/paulodybala/bio-background/bio-background-paulodybala-5.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--hNexAXHB--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kZmy-Vgy--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kBiVrv9S--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--lj3tasyI--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--icC2aigW--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r_NgvEWz--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--iOs9urG0--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--8deYo15Z--/v1561386270/app/stars/paulodybala/bio-background/bio-background-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--TCbBv8lE--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--nbhqjDvp--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vo57bFra--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--fzCG5iOA--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--cEJVT6cE--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--BYN8rYih--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XUgnS3v3--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Ycq4OTYZ--/v1561386269/app/stars/paulodybala/bio-background/bio-background-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eKsUIK_6--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XVoS3SED--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ffE2mMY0--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O1sAzewc--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UXxukzem--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4gwVpkKS--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--k8ubPyMc--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--zOPbIWsG--/v1561386268/app/stars/paulodybala/bio-background/bio-background-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eQvcSAa9--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--GfAOQfz8--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kNF5AOEN--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4yzd5fNz--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Nbm2VxGE--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---KmtotUO--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--I11FP2s0--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Sg7f68xZ--/v1561386267/app/stars/paulodybala/bio-background/bio-background-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--zxZQqAX7--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--44EUg7Df--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--QYrdfya2--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kj-2j_Q6--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--wDB6AbJr--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--drDPCeB0--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--CH6RxPEp--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Signature',
                  width: 400,
                  height: 400,
                  format: 'png',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--9qGlnRGo--/v1561386266/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1.png',
                  public_id: 'app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                  media: [
                    {
                      width: 399,
                      height: 399,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ojTLJ81q--/c_scale,w_399/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 200,
                      height: 200,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--AXfFNkin--/c_scale,w_200/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 100,
                      height: 100,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--KJmHxBjP--/c_scale,w_100/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 50,
                      height: 50,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xkyIgZ-6--/c_scale,w_50/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                  ],
                },
              ],
            },
          ],
          starType: 'Footballer',
          externalId: 'paulodybala',
          bio:
            "I wanted to quit football when I was just 15. I had lost my dad to cancer and it felt like the end of the world. I kept going to make up for all the sacrifices he had made for me, and now every time I score I point to the sky to say thank you. When you're a footballer, people judge you without knowing who you really are. I want to change that.",
          avatar:
            'https://res.cloudinary.com/our-star-club/image/authenticated/s--0d043K3P--/v1/app/stars/paulodybala/avatar/avatar-paulodybala',
          starExternalId: 'paulodybala',
        },
      ],
      description:
        'Just add a question in the comments section below by 23.59 GMT on Tuesday 12th March, and you will be in with a chance to get it answered next week in Turin. Keep an eye on your email to see if your question has been selected - and good luck!',
      descriptionBrief:
        'Just add a question in the comments section below by 23.59 GMT on Tuesday 12th March, and you will be in with a chance to get it answered next week in Turin. Keep an eye on your email to see if your question has been selected - and good luck!',
      title: '#OTROasks Paulo Dybala',
      titleBrief: '#OTROasks Dybala',
      language: 'en',
      tags: [],
      creatives: [
        {
          mediaUsageType: 'Artwork',
          width: 703,
          height: 916,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--u9eamXit--/v1565879444/app/content/otro-asks-dybala/otro-asks-dybala-4.jpg',
          public_id: 'app/content/otro-asks-dybala/otro-asks-dybala-4',
          media: [
            {
              width: 702,
              height: 915,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--KlkkUxYI--/c_scale,w_702/v1/app/content/otro-asks-dybala/otro-asks-dybala-4',
            },
            {
              width: 351,
              height: 458,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--0TfJbhOI--/c_scale,w_351/v1/app/content/otro-asks-dybala/otro-asks-dybala-4',
            },
            {
              width: 176,
              height: 229,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--bhQq39vQ--/c_scale,w_176/v1/app/content/otro-asks-dybala/otro-asks-dybala-4',
            },
            {
              width: 88,
              height: 115,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--pUU_bnhr--/c_scale,w_88/v1/app/content/otro-asks-dybala/otro-asks-dybala-4',
            },
            {
              width: 44,
              height: 58,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--uEJmNWz0--/c_scale,w_44/v1/app/content/otro-asks-dybala/otro-asks-dybala-4',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 4000,
          height: 5696,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--5SklIAyj--/v1565879443/app/content/otro-asks-dybala/otro-asks-dybala-5.jpg',
          public_id: 'app/content/otro-asks-dybala/otro-asks-dybala-5',
          media: [
            {
              width: 3999,
              height: 5695,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--7phb5mj9--/c_scale,w_3999/v1/app/content/otro-asks-dybala/otro-asks-dybala-5',
            },
            {
              width: 2000,
              height: 2848,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--R7_6hIDs--/c_scale,w_2000/v1/app/content/otro-asks-dybala/otro-asks-dybala-5',
            },
            {
              width: 1000,
              height: 1424,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--GxpIiV8p--/c_scale,w_1000/v1/app/content/otro-asks-dybala/otro-asks-dybala-5',
            },
            {
              width: 500,
              height: 712,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--0WoJ8J8O--/c_scale,w_500/v1/app/content/otro-asks-dybala/otro-asks-dybala-5',
            },
            {
              width: 250,
              height: 356,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--K_PRz2p9--/c_scale,w_250/v1/app/content/otro-asks-dybala/otro-asks-dybala-5',
            },
            {
              width: 125,
              height: 178,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--JrnEWOB---/c_scale,w_125/v1/app/content/otro-asks-dybala/otro-asks-dybala-5',
            },
            {
              width: 63,
              height: 89,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--oijvcRlZ--/c_scale,w_63/v1/app/content/otro-asks-dybala/otro-asks-dybala-5',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 2160,
          height: 2813,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--RenZpj30--/v1565879443/app/content/otro-asks-dybala/otro-asks-dybala-2.jpg',
          public_id: 'app/content/otro-asks-dybala/otro-asks-dybala-2',
          media: [
            {
              width: 2159,
              height: 2812,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--hnbT_sn4--/c_scale,w_2159/v1/app/content/otro-asks-dybala/otro-asks-dybala-2',
            },
            {
              width: 1080,
              height: 1406,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--yh619Vfb--/c_scale,w_1080/v1/app/content/otro-asks-dybala/otro-asks-dybala-2',
            },
            {
              width: 540,
              height: 703,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--PnjoUQFQ--/c_scale,w_540/v1/app/content/otro-asks-dybala/otro-asks-dybala-2',
            },
            {
              width: 270,
              height: 352,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--HskDNWW5--/c_scale,w_270/v1/app/content/otro-asks-dybala/otro-asks-dybala-2',
            },
            {
              width: 135,
              height: 176,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--KahHOo6_--/c_scale,w_135/v1/app/content/otro-asks-dybala/otro-asks-dybala-2',
            },
            {
              width: 68,
              height: 88,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--fVPd26CN--/c_scale,w_68/v1/app/content/otro-asks-dybala/otro-asks-dybala-2',
            },
            {
              width: 34,
              height: 44,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s---vIGMlkT--/c_scale,w_34/v1/app/content/otro-asks-dybala/otro-asks-dybala-2',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 660,
          height: 860,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--bcMkrEOO--/v1565879443/app/content/otro-asks-dybala/otro-asks-dybala-3.jpg',
          public_id: 'app/content/otro-asks-dybala/otro-asks-dybala-3',
          media: [
            {
              width: 659,
              height: 859,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--GLz2vvFO--/c_scale,w_659/v1/app/content/otro-asks-dybala/otro-asks-dybala-3',
            },
            {
              width: 330,
              height: 430,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--4ZMyVszO--/c_scale,w_330/v1/app/content/otro-asks-dybala/otro-asks-dybala-3',
            },
            {
              width: 165,
              height: 215,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Ir21K3GB--/c_scale,w_165/v1/app/content/otro-asks-dybala/otro-asks-dybala-3',
            },
            {
              width: 83,
              height: 108,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ofJ9G3HA--/c_scale,w_83/v1/app/content/otro-asks-dybala/otro-asks-dybala-3',
            },
            {
              width: 42,
              height: 54,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--A_evOIdd--/c_scale,w_42/v1/app/content/otro-asks-dybala/otro-asks-dybala-3',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1080,
          height: 608,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--UL1fB6bR--/v1565879443/app/content/otro-asks-dybala/otro-asks-dybala-1.jpg',
          public_id: 'app/content/otro-asks-dybala/otro-asks-dybala-1',
          media: [
            {
              width: 1079,
              height: 607,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--HR5_gqqO--/c_scale,w_1079/v1/app/content/otro-asks-dybala/otro-asks-dybala-1',
            },
            {
              width: 540,
              height: 304,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--5db-lKAg--/c_scale,w_540/v1/app/content/otro-asks-dybala/otro-asks-dybala-1',
            },
            {
              width: 270,
              height: 152,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--JkD5WpNq--/c_scale,w_270/v1/app/content/otro-asks-dybala/otro-asks-dybala-1',
            },
            {
              width: 135,
              height: 76,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--YdKfJJ2x--/c_scale,w_135/v1/app/content/otro-asks-dybala/otro-asks-dybala-1',
            },
            {
              width: 68,
              height: 38,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--29rRk0VD--/c_scale,w_68/v1/app/content/otro-asks-dybala/otro-asks-dybala-1',
            },
            {
              width: 34,
              height: 19,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--CyM1mr68--/c_scale,w_34/v1/app/content/otro-asks-dybala/otro-asks-dybala-1',
            },
          ],
        },
      ],
      contentTypeName: 'Video',
      duration: 27.28,
    },
    {
      externalId: 'dybala-memorabilia',
      contentContributors: [
        {
          forename: 'Paulo',
          seoCode: 'paulodybala',
          surname: 'Dybala',
          mediaGroup: [
            {
              usage: 'PROFILE',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--UFVP3ITo--/v1561386276/app/stars/paulodybala/player-index/player-index-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--PYqrjhyB--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--omVyPq1x--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O8pwhSyp--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--RJsRgoTR--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---WEiGhDa--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Rj4wLy4g--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--NcORKOTo--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--VmScKwlJ--/v1561386274/app/stars/paulodybala/player-index/player-index-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ktepon8K--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--T8bw45Ky--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--w31M59U2--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--c1zcVQlB--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--uKoY5q89--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_jloW88O--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XaE169xg--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--cyWkZuYV--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-2',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--rBVX3x0B--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_IgeYBOk--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xc5D_NqC--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Qs-BDG00--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--osyv-qux--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r7XPoMyv--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--q4spcb6j--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Cff2KjJi--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vvX-XH0x--/c_scale,w_3839/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--P966A23d--/c_scale,w_1920/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--pI2Q4AE3--/c_scale,w_960/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--riogy0jw--/c_scale,w_480/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--3Wb1rnOy--/c_scale,w_240/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UeO0tCCc--/c_scale,w_120/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--okY8yuOe--/c_scale,w_60/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                  ],
                },
              ],
            },
            {
              usage: 'BIO',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--fkGJvJdz--/v1561386272/app/stars/paulodybala/bio-background/bio-background-paulodybala-5.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--hNexAXHB--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kZmy-Vgy--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kBiVrv9S--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--lj3tasyI--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--icC2aigW--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r_NgvEWz--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--iOs9urG0--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--8deYo15Z--/v1561386270/app/stars/paulodybala/bio-background/bio-background-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--TCbBv8lE--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--nbhqjDvp--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vo57bFra--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--fzCG5iOA--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--cEJVT6cE--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--BYN8rYih--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XUgnS3v3--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Ycq4OTYZ--/v1561386269/app/stars/paulodybala/bio-background/bio-background-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eKsUIK_6--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XVoS3SED--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ffE2mMY0--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O1sAzewc--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UXxukzem--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4gwVpkKS--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--k8ubPyMc--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--zOPbIWsG--/v1561386268/app/stars/paulodybala/bio-background/bio-background-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eQvcSAa9--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--GfAOQfz8--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kNF5AOEN--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4yzd5fNz--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Nbm2VxGE--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---KmtotUO--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--I11FP2s0--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Sg7f68xZ--/v1561386267/app/stars/paulodybala/bio-background/bio-background-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--zxZQqAX7--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--44EUg7Df--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--QYrdfya2--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kj-2j_Q6--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--wDB6AbJr--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--drDPCeB0--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--CH6RxPEp--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Signature',
                  width: 400,
                  height: 400,
                  format: 'png',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--9qGlnRGo--/v1561386266/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1.png',
                  public_id: 'app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                  media: [
                    {
                      width: 399,
                      height: 399,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ojTLJ81q--/c_scale,w_399/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 200,
                      height: 200,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--AXfFNkin--/c_scale,w_200/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 100,
                      height: 100,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--KJmHxBjP--/c_scale,w_100/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 50,
                      height: 50,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xkyIgZ-6--/c_scale,w_50/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                  ],
                },
              ],
            },
          ],
          starType: 'Footballer',
          externalId: 'paulodybala',
          bio:
            "I wanted to quit football when I was just 15. I had lost my dad to cancer and it felt like the end of the world. I kept going to make up for all the sacrifices he had made for me, and now every time I score I point to the sky to say thank you. When you're a footballer, people judge you without knowing who you really are. I want to change that.",
          avatar:
            'https://res.cloudinary.com/our-star-club/image/authenticated/s--0d043K3P--/v1/app/stars/paulodybala/avatar/avatar-paulodybala',
          starExternalId: 'paulodybala',
        },
      ],
      description:
        'Dybala explains the significance of each of the items in his impressive collection; from medals, trophies and shirts to a portrait with sentimental value and a tiny model of a gladiator.',
      descriptionBrief:
        'Dybala explains the significance of each of the items in his impressive collection; from medals, trophies and shirts to a portrait with sentimental value and a tiny model of a gladiator.',
      title: 'Dybala: Memorabilia',
      titleBrief: 'Memorabilia',
      language: 'en',
      tags: [],
      creatives: [
        {
          mediaUsageType: 'Artwork',
          width: 803,
          height: 803,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--jFxbxqWk--/v1565879407/app/content/dybala-memorabilia/dybala-memorabilia-2.jpg',
          public_id: 'app/content/dybala-memorabilia/dybala-memorabilia-2',
          media: [
            {
              width: 802,
              height: 802,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--eAOx1XHu--/c_scale,w_802/v1/app/content/dybala-memorabilia/dybala-memorabilia-2',
            },
            {
              width: 401,
              height: 401,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--3RkeAnNb--/c_scale,w_401/v1/app/content/dybala-memorabilia/dybala-memorabilia-2',
            },
            {
              width: 201,
              height: 201,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ysO2MLap--/c_scale,w_201/v1/app/content/dybala-memorabilia/dybala-memorabilia-2',
            },
            {
              width: 101,
              height: 101,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--txK4Gk-S--/c_scale,w_101/v1/app/content/dybala-memorabilia/dybala-memorabilia-2',
            },
            {
              width: 51,
              height: 51,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Z-82unvm--/c_scale,w_51/v1/app/content/dybala-memorabilia/dybala-memorabilia-2',
            },
            {
              width: 26,
              height: 26,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--qNtpdG4a--/c_scale,w_26/v1/app/content/dybala-memorabilia/dybala-memorabilia-2',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1436,
          height: 673,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--6pqvEy0f--/v1565879407/app/content/dybala-memorabilia/dybala-memorabilia-4.jpg',
          public_id: 'app/content/dybala-memorabilia/dybala-memorabilia-4',
          media: [
            {
              width: 1435,
              height: 673,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--EScd_LzR--/c_scale,w_1435/v1/app/content/dybala-memorabilia/dybala-memorabilia-4',
            },
            {
              width: 718,
              height: 337,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--kKtEehR4--/c_scale,w_718/v1/app/content/dybala-memorabilia/dybala-memorabilia-4',
            },
            {
              width: 359,
              height: 169,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--dLShJuy5--/c_scale,w_359/v1/app/content/dybala-memorabilia/dybala-memorabilia-4',
            },
            {
              width: 180,
              height: 85,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--6z4CWdB---/c_scale,w_180/v1/app/content/dybala-memorabilia/dybala-memorabilia-4',
            },
            {
              width: 90,
              height: 43,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--F9qW6jiS--/c_scale,w_90/v1/app/content/dybala-memorabilia/dybala-memorabilia-4',
            },
            {
              width: 45,
              height: 22,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--8J5yj11z--/c_scale,w_45/v1/app/content/dybala-memorabilia/dybala-memorabilia-4',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 564,
          height: 803,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--9Nip_LkC--/v1565879407/app/content/dybala-memorabilia/dybala-memorabilia-5.jpg',
          public_id: 'app/content/dybala-memorabilia/dybala-memorabilia-5',
          media: [
            {
              width: 563,
              height: 802,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--8f2BS_Jy--/c_scale,w_563/v1/app/content/dybala-memorabilia/dybala-memorabilia-5',
            },
            {
              width: 282,
              height: 401,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--6wWw89iB--/c_scale,w_282/v1/app/content/dybala-memorabilia/dybala-memorabilia-5',
            },
            {
              width: 141,
              height: 201,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--wZ34CMjV--/c_scale,w_141/v1/app/content/dybala-memorabilia/dybala-memorabilia-5',
            },
            {
              width: 71,
              height: 101,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--C5F3dEnH--/c_scale,w_71/v1/app/content/dybala-memorabilia/dybala-memorabilia-5',
            },
            {
              width: 36,
              height: 51,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--YkNuk9EN--/c_scale,w_36/v1/app/content/dybala-memorabilia/dybala-memorabilia-5',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1428,
          height: 803,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--DymF7H_s--/v1565879407/app/content/dybala-memorabilia/dybala-memorabilia-3.jpg',
          public_id: 'app/content/dybala-memorabilia/dybala-memorabilia-3',
          media: [
            {
              width: 1427,
              height: 802,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--0Ecw8yhE--/c_scale,w_1427/v1/app/content/dybala-memorabilia/dybala-memorabilia-3',
            },
            {
              width: 714,
              height: 401,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--CecXE966--/c_scale,w_714/v1/app/content/dybala-memorabilia/dybala-memorabilia-3',
            },
            {
              width: 357,
              height: 201,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--bPkZpW6U--/c_scale,w_357/v1/app/content/dybala-memorabilia/dybala-memorabilia-3',
            },
            {
              width: 179,
              height: 101,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--XP0wtwhU--/c_scale,w_179/v1/app/content/dybala-memorabilia/dybala-memorabilia-3',
            },
            {
              width: 90,
              height: 51,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Gz08abFN--/c_scale,w_90/v1/app/content/dybala-memorabilia/dybala-memorabilia-3',
            },
            {
              width: 45,
              height: 26,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--aaQjpH_---/c_scale,w_45/v1/app/content/dybala-memorabilia/dybala-memorabilia-3',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 617,
          height: 803,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--w88h1MEy--/v1565879407/app/content/dybala-memorabilia/dybala-memorabilia-1.jpg',
          public_id: 'app/content/dybala-memorabilia/dybala-memorabilia-1',
          media: [
            {
              width: 616,
              height: 802,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--R_lSazQ0--/c_scale,w_616/v1/app/content/dybala-memorabilia/dybala-memorabilia-1',
            },
            {
              width: 308,
              height: 401,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--L9uXCXne--/c_scale,w_308/v1/app/content/dybala-memorabilia/dybala-memorabilia-1',
            },
            {
              width: 154,
              height: 201,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--6ylQyDlG--/c_scale,w_154/v1/app/content/dybala-memorabilia/dybala-memorabilia-1',
            },
            {
              width: 77,
              height: 101,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--I_Nf1LZM--/c_scale,w_77/v1/app/content/dybala-memorabilia/dybala-memorabilia-1',
            },
            {
              width: 39,
              height: 51,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--CdpOqkG1--/c_scale,w_39/v1/app/content/dybala-memorabilia/dybala-memorabilia-1',
            },
          ],
        },
      ],
      contentTypeName: 'Video',
      duration: 161.4,
    },
    {
      externalId: 'dybala-firsts',
      contentContributors: [
        {
          forename: 'Paulo',
          seoCode: 'paulodybala',
          surname: 'Dybala',
          mediaGroup: [
            {
              usage: 'PROFILE',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--UFVP3ITo--/v1561386276/app/stars/paulodybala/player-index/player-index-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--PYqrjhyB--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--omVyPq1x--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O8pwhSyp--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--RJsRgoTR--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---WEiGhDa--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Rj4wLy4g--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--NcORKOTo--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--VmScKwlJ--/v1561386274/app/stars/paulodybala/player-index/player-index-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ktepon8K--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--T8bw45Ky--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--w31M59U2--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--c1zcVQlB--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--uKoY5q89--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_jloW88O--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XaE169xg--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--cyWkZuYV--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-2',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--rBVX3x0B--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_IgeYBOk--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xc5D_NqC--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Qs-BDG00--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--osyv-qux--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r7XPoMyv--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--q4spcb6j--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Cff2KjJi--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vvX-XH0x--/c_scale,w_3839/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--P966A23d--/c_scale,w_1920/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--pI2Q4AE3--/c_scale,w_960/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--riogy0jw--/c_scale,w_480/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--3Wb1rnOy--/c_scale,w_240/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UeO0tCCc--/c_scale,w_120/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--okY8yuOe--/c_scale,w_60/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                  ],
                },
              ],
            },
            {
              usage: 'BIO',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--fkGJvJdz--/v1561386272/app/stars/paulodybala/bio-background/bio-background-paulodybala-5.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--hNexAXHB--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kZmy-Vgy--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kBiVrv9S--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--lj3tasyI--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--icC2aigW--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r_NgvEWz--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--iOs9urG0--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--8deYo15Z--/v1561386270/app/stars/paulodybala/bio-background/bio-background-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--TCbBv8lE--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--nbhqjDvp--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vo57bFra--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--fzCG5iOA--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--cEJVT6cE--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--BYN8rYih--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XUgnS3v3--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Ycq4OTYZ--/v1561386269/app/stars/paulodybala/bio-background/bio-background-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eKsUIK_6--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XVoS3SED--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ffE2mMY0--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O1sAzewc--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UXxukzem--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4gwVpkKS--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--k8ubPyMc--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--zOPbIWsG--/v1561386268/app/stars/paulodybala/bio-background/bio-background-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eQvcSAa9--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--GfAOQfz8--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kNF5AOEN--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4yzd5fNz--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Nbm2VxGE--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---KmtotUO--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--I11FP2s0--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Sg7f68xZ--/v1561386267/app/stars/paulodybala/bio-background/bio-background-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--zxZQqAX7--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--44EUg7Df--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--QYrdfya2--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kj-2j_Q6--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--wDB6AbJr--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--drDPCeB0--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--CH6RxPEp--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Signature',
                  width: 400,
                  height: 400,
                  format: 'png',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--9qGlnRGo--/v1561386266/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1.png',
                  public_id: 'app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                  media: [
                    {
                      width: 399,
                      height: 399,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ojTLJ81q--/c_scale,w_399/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 200,
                      height: 200,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--AXfFNkin--/c_scale,w_200/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 100,
                      height: 100,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--KJmHxBjP--/c_scale,w_100/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 50,
                      height: 50,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xkyIgZ-6--/c_scale,w_50/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                  ],
                },
              ],
            },
          ],
          starType: 'Footballer',
          externalId: 'paulodybala',
          bio:
            "I wanted to quit football when I was just 15. I had lost my dad to cancer and it felt like the end of the world. I kept going to make up for all the sacrifices he had made for me, and now every time I score I point to the sky to say thank you. When you're a footballer, people judge you without knowing who you really are. I want to change that.",
          avatar:
            'https://res.cloudinary.com/our-star-club/image/authenticated/s--0d043K3P--/v1/app/stars/paulodybala/avatar/avatar-paulodybala',
          starExternalId: 'paulodybala',
        },
      ],
      description:
        'Paulo Dybala recounts some of his most important firsts, from his early childhood goal-scoring exploits to pinpointing the moment he earned the admiration of the Juventus supporters.',
      descriptionBrief:
        'Paulo Dybala recounts some of his most important firsts, from his early childhood goal-scoring exploits to pinpointing the moment he earned the admiration of the Juventus supporters.',
      title: 'Paulo Dybala: Firsts',
      titleBrief: 'Firsts',
      language: 'en',
      tags: [],
      creatives: [
        {
          mediaUsageType: 'Artwork',
          width: 2160,
          height: 2160,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--HOfnfbqs--/v1565879407/app/content/dybala-firsts/dybala-firsts-5.jpg',
          public_id: 'app/content/dybala-firsts/dybala-firsts-5',
          media: [
            {
              width: 2159,
              height: 2159,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--KA5mxm9X--/c_scale,w_2159/v1/app/content/dybala-firsts/dybala-firsts-5',
            },
            {
              width: 1080,
              height: 1080,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--o8rHTyEs--/c_scale,w_1080/v1/app/content/dybala-firsts/dybala-firsts-5',
            },
            {
              width: 540,
              height: 540,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--gX9cRdFo--/c_scale,w_540/v1/app/content/dybala-firsts/dybala-firsts-5',
            },
            {
              width: 270,
              height: 270,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--tucWNmzb--/c_scale,w_270/v1/app/content/dybala-firsts/dybala-firsts-5',
            },
            {
              width: 135,
              height: 135,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--BAV_OPD2--/c_scale,w_135/v1/app/content/dybala-firsts/dybala-firsts-5',
            },
            {
              width: 68,
              height: 68,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--xk-dgpiF--/c_scale,w_68/v1/app/content/dybala-firsts/dybala-firsts-5',
            },
            {
              width: 34,
              height: 34,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--uPXVMNIV--/c_scale,w_34/v1/app/content/dybala-firsts/dybala-firsts-5',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 3840,
          height: 2160,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--yUvU_kA6--/v1565879407/app/content/dybala-firsts/dybala-firsts-4.jpg',
          public_id: 'app/content/dybala-firsts/dybala-firsts-4',
          media: [
            {
              width: 3839,
              height: 2159,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--QrvsRhqx--/c_scale,w_3839/v1/app/content/dybala-firsts/dybala-firsts-4',
            },
            {
              width: 1920,
              height: 1080,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--TLO2PgFC--/c_scale,w_1920/v1/app/content/dybala-firsts/dybala-firsts-4',
            },
            {
              width: 960,
              height: 540,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--aXS13GS1--/c_scale,w_960/v1/app/content/dybala-firsts/dybala-firsts-4',
            },
            {
              width: 480,
              height: 270,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--CAXE9OW4--/c_scale,w_480/v1/app/content/dybala-firsts/dybala-firsts-4',
            },
            {
              width: 240,
              height: 135,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--NfFYO8mW--/c_scale,w_240/v1/app/content/dybala-firsts/dybala-firsts-4',
            },
            {
              width: 120,
              height: 68,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--_52oZrKa--/c_scale,w_120/v1/app/content/dybala-firsts/dybala-firsts-4',
            },
            {
              width: 60,
              height: 34,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--0d2ak-3C--/c_scale,w_60/v1/app/content/dybala-firsts/dybala-firsts-4',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 3840,
          height: 1800,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--6gZ8wMSV--/v1565879407/app/content/dybala-firsts/dybala-firsts-3.jpg',
          public_id: 'app/content/dybala-firsts/dybala-firsts-3',
          media: [
            {
              width: 3839,
              height: 1800,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--FxjCN6cQ--/c_scale,w_3839/v1/app/content/dybala-firsts/dybala-firsts-3',
            },
            {
              width: 1920,
              height: 900,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--BNr8MvE2--/c_scale,w_1920/v1/app/content/dybala-firsts/dybala-firsts-3',
            },
            {
              width: 960,
              height: 450,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--j8e9mcjD--/c_scale,w_960/v1/app/content/dybala-firsts/dybala-firsts-3',
            },
            {
              width: 480,
              height: 225,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--PUKvC-Ow--/c_scale,w_480/v1/app/content/dybala-firsts/dybala-firsts-3',
            },
            {
              width: 240,
              height: 113,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--0tjDjqOE--/c_scale,w_240/v1/app/content/dybala-firsts/dybala-firsts-3',
            },
            {
              width: 120,
              height: 57,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--d8B3D8rh--/c_scale,w_120/v1/app/content/dybala-firsts/dybala-firsts-3',
            },
            {
              width: 60,
              height: 29,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--AKWTji1u--/c_scale,w_60/v1/app/content/dybala-firsts/dybala-firsts-3',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 2160,
          height: 2813,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--fJx9zvNS--/v1565879407/app/content/dybala-firsts/dybala-firsts-1.jpg',
          public_id: 'app/content/dybala-firsts/dybala-firsts-1',
          media: [
            {
              width: 2159,
              height: 2812,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--X3G1t2Wx--/c_scale,w_2159/v1/app/content/dybala-firsts/dybala-firsts-1',
            },
            {
              width: 1080,
              height: 1406,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--KPoRCVs6--/c_scale,w_1080/v1/app/content/dybala-firsts/dybala-firsts-1',
            },
            {
              width: 540,
              height: 703,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ezuAZEDp--/c_scale,w_540/v1/app/content/dybala-firsts/dybala-firsts-1',
            },
            {
              width: 270,
              height: 352,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--tjWu-bLi--/c_scale,w_270/v1/app/content/dybala-firsts/dybala-firsts-1',
            },
            {
              width: 135,
              height: 176,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--xcjDL-6u--/c_scale,w_135/v1/app/content/dybala-firsts/dybala-firsts-1',
            },
            {
              width: 68,
              height: 88,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--LtTyq0Ju--/c_scale,w_68/v1/app/content/dybala-firsts/dybala-firsts-1',
            },
            {
              width: 34,
              height: 44,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Lm5kWNLV--/c_scale,w_34/v1/app/content/dybala-firsts/dybala-firsts-1',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 2160,
          height: 3076,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--FVgdxoLQ--/v1565879407/app/content/dybala-firsts/dybala-firsts-2.jpg',
          public_id: 'app/content/dybala-firsts/dybala-firsts-2',
          media: [
            {
              width: 2159,
              height: 3075,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--yXZXoq5G--/c_scale,w_2159/v1/app/content/dybala-firsts/dybala-firsts-2',
            },
            {
              width: 1080,
              height: 1538,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ng3kZuPo--/c_scale,w_1080/v1/app/content/dybala-firsts/dybala-firsts-2',
            },
            {
              width: 540,
              height: 769,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--sk7yEE8h--/c_scale,w_540/v1/app/content/dybala-firsts/dybala-firsts-2',
            },
            {
              width: 270,
              height: 385,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--qJJB2KLk--/c_scale,w_270/v1/app/content/dybala-firsts/dybala-firsts-2',
            },
            {
              width: 135,
              height: 193,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--PoOSP0UG--/c_scale,w_135/v1/app/content/dybala-firsts/dybala-firsts-2',
            },
            {
              width: 68,
              height: 97,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ag2Dxfxu--/c_scale,w_68/v1/app/content/dybala-firsts/dybala-firsts-2',
            },
            {
              width: 34,
              height: 49,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--okkiGZXO--/c_scale,w_34/v1/app/content/dybala-firsts/dybala-firsts-2',
            },
          ],
        },
      ],
      contentTypeName: 'Video',
      duration: 328.96,
    },
    {
      externalId: 'dybala-my-other-side',
      contentContributors: [
        {
          forename: 'Paulo',
          seoCode: 'paulodybala',
          surname: 'Dybala',
          mediaGroup: [
            {
              usage: 'PROFILE',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--UFVP3ITo--/v1561386276/app/stars/paulodybala/player-index/player-index-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--PYqrjhyB--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--omVyPq1x--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O8pwhSyp--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--RJsRgoTR--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---WEiGhDa--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Rj4wLy4g--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--NcORKOTo--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--VmScKwlJ--/v1561386274/app/stars/paulodybala/player-index/player-index-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ktepon8K--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--T8bw45Ky--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--w31M59U2--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--c1zcVQlB--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--uKoY5q89--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_jloW88O--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XaE169xg--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--cyWkZuYV--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-2',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--rBVX3x0B--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_IgeYBOk--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xc5D_NqC--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Qs-BDG00--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--osyv-qux--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r7XPoMyv--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--q4spcb6j--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Cff2KjJi--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vvX-XH0x--/c_scale,w_3839/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--P966A23d--/c_scale,w_1920/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--pI2Q4AE3--/c_scale,w_960/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--riogy0jw--/c_scale,w_480/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--3Wb1rnOy--/c_scale,w_240/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UeO0tCCc--/c_scale,w_120/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--okY8yuOe--/c_scale,w_60/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                  ],
                },
              ],
            },
            {
              usage: 'BIO',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--fkGJvJdz--/v1561386272/app/stars/paulodybala/bio-background/bio-background-paulodybala-5.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--hNexAXHB--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kZmy-Vgy--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kBiVrv9S--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--lj3tasyI--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--icC2aigW--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r_NgvEWz--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--iOs9urG0--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--8deYo15Z--/v1561386270/app/stars/paulodybala/bio-background/bio-background-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--TCbBv8lE--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--nbhqjDvp--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vo57bFra--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--fzCG5iOA--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--cEJVT6cE--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--BYN8rYih--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XUgnS3v3--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Ycq4OTYZ--/v1561386269/app/stars/paulodybala/bio-background/bio-background-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eKsUIK_6--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XVoS3SED--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ffE2mMY0--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O1sAzewc--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UXxukzem--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4gwVpkKS--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--k8ubPyMc--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--zOPbIWsG--/v1561386268/app/stars/paulodybala/bio-background/bio-background-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eQvcSAa9--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--GfAOQfz8--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kNF5AOEN--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4yzd5fNz--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Nbm2VxGE--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---KmtotUO--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--I11FP2s0--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Sg7f68xZ--/v1561386267/app/stars/paulodybala/bio-background/bio-background-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--zxZQqAX7--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--44EUg7Df--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--QYrdfya2--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kj-2j_Q6--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--wDB6AbJr--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--drDPCeB0--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--CH6RxPEp--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Signature',
                  width: 400,
                  height: 400,
                  format: 'png',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--9qGlnRGo--/v1561386266/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1.png',
                  public_id: 'app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                  media: [
                    {
                      width: 399,
                      height: 399,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ojTLJ81q--/c_scale,w_399/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 200,
                      height: 200,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--AXfFNkin--/c_scale,w_200/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 100,
                      height: 100,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--KJmHxBjP--/c_scale,w_100/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 50,
                      height: 50,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xkyIgZ-6--/c_scale,w_50/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                  ],
                },
              ],
            },
          ],
          starType: 'Footballer',
          externalId: 'paulodybala',
          bio:
            "I wanted to quit football when I was just 15. I had lost my dad to cancer and it felt like the end of the world. I kept going to make up for all the sacrifices he had made for me, and now every time I score I point to the sky to say thank you. When you're a footballer, people judge you without knowing who you really are. I want to change that.",
          avatar:
            'https://res.cloudinary.com/our-star-club/image/authenticated/s--0d043K3P--/v1/app/stars/paulodybala/avatar/avatar-paulodybala',
          starExternalId: 'paulodybala',
        },
      ],
      description:
        'Paulo Dybala shows off the tattoos that symbolise his relationships with friends and family, and details the sacrifices he made growing up to fulfil his dream of being a footballer.',
      descriptionBrief:
        'Paulo Dybala shows off the tattoos that symbolise his relationships with friends and family, and details the sacrifices he made growing up to fulfil his dream of being a footballer.',
      title: 'Dybala: My Other Side',
      titleBrief: 'My Other Side',
      language: 'en',
      tags: [],
      creatives: [
        {
          mediaUsageType: 'Artwork',
          width: 1200,
          height: 563,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--dcAsmcRn--/v1565879407/app/content/dybala-my-other-side/dybala-my-other-side-4.jpg',
          public_id: 'app/content/dybala-my-other-side/dybala-my-other-side-4',
          media: [
            {
              width: 1199,
              height: 563,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--UcMofXYu--/c_scale,w_1199/v1/app/content/dybala-my-other-side/dybala-my-other-side-4',
            },
            {
              width: 600,
              height: 282,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--dGNtCCTX--/c_scale,w_600/v1/app/content/dybala-my-other-side/dybala-my-other-side-4',
            },
            {
              width: 300,
              height: 141,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--rl9LCXvz--/c_scale,w_300/v1/app/content/dybala-my-other-side/dybala-my-other-side-4',
            },
            {
              width: 150,
              height: 71,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--oJ3DkH-z--/c_scale,w_150/v1/app/content/dybala-my-other-side/dybala-my-other-side-4',
            },
            {
              width: 75,
              height: 36,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--HUqVP8o0--/c_scale,w_75/v1/app/content/dybala-my-other-side/dybala-my-other-side-4',
            },
            {
              width: 38,
              height: 18,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--PfoT67Ds--/c_scale,w_38/v1/app/content/dybala-my-other-side/dybala-my-other-side-4',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 588,
          height: 766,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--BqRWjRZD--/v1565879407/app/content/dybala-my-other-side/dybala-my-other-side-5.jpg',
          public_id: 'app/content/dybala-my-other-side/dybala-my-other-side-5',
          media: [
            {
              width: 587,
              height: 765,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--_hYdLIFB--/c_scale,w_587/v1/app/content/dybala-my-other-side/dybala-my-other-side-5',
            },
            {
              width: 294,
              height: 383,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--MyywuA26--/c_scale,w_294/v1/app/content/dybala-my-other-side/dybala-my-other-side-5',
            },
            {
              width: 147,
              height: 192,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--eTUxZ2oO--/c_scale,w_147/v1/app/content/dybala-my-other-side/dybala-my-other-side-5',
            },
            {
              width: 74,
              height: 96,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--HEGyleXn--/c_scale,w_74/v1/app/content/dybala-my-other-side/dybala-my-other-side-5',
            },
            {
              width: 37,
              height: 48,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Xuh80XHq--/c_scale,w_37/v1/app/content/dybala-my-other-side/dybala-my-other-side-5',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1200,
          height: 675,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--wG4BvNKS--/v1565879407/app/content/dybala-my-other-side/dybala-my-other-side-3.jpg',
          public_id: 'app/content/dybala-my-other-side/dybala-my-other-side-3',
          media: [
            {
              width: 1199,
              height: 674,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--DoIcQ0wm--/c_scale,w_1199/v1/app/content/dybala-my-other-side/dybala-my-other-side-3',
            },
            {
              width: 600,
              height: 337,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Ge6hD3JG--/c_scale,w_600/v1/app/content/dybala-my-other-side/dybala-my-other-side-3',
            },
            {
              width: 300,
              height: 169,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--aVCnIDgX--/c_scale,w_300/v1/app/content/dybala-my-other-side/dybala-my-other-side-3',
            },
            {
              width: 150,
              height: 85,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ObfsfaJM--/c_scale,w_150/v1/app/content/dybala-my-other-side/dybala-my-other-side-3',
            },
            {
              width: 75,
              height: 43,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--f84Is4SA--/c_scale,w_75/v1/app/content/dybala-my-other-side/dybala-my-other-side-3',
            },
            {
              width: 38,
              height: 22,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ujqZj-LR--/c_scale,w_38/v1/app/content/dybala-my-other-side/dybala-my-other-side-3',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 538,
          height: 766,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--GdD4oioL--/v1565879407/app/content/dybala-my-other-side/dybala-my-other-side-2.jpg',
          public_id: 'app/content/dybala-my-other-side/dybala-my-other-side-2',
          media: [
            {
              width: 537,
              height: 765,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--kyYctbvN--/c_scale,w_537/v1/app/content/dybala-my-other-side/dybala-my-other-side-2',
            },
            {
              width: 269,
              height: 383,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--c2c-S1LJ--/c_scale,w_269/v1/app/content/dybala-my-other-side/dybala-my-other-side-2',
            },
            {
              width: 135,
              height: 192,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--aO_-jvN1--/c_scale,w_135/v1/app/content/dybala-my-other-side/dybala-my-other-side-2',
            },
            {
              width: 68,
              height: 96,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--cpI2Idl8--/c_scale,w_68/v1/app/content/dybala-my-other-side/dybala-my-other-side-2',
            },
            {
              width: 34,
              height: 48,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--osbZAodZ--/c_scale,w_34/v1/app/content/dybala-my-other-side/dybala-my-other-side-2',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 759,
          height: 759,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--gg64flrh--/v1565879407/app/content/dybala-my-other-side/dybala-my-other-side-1.jpg',
          public_id: 'app/content/dybala-my-other-side/dybala-my-other-side-1',
          media: [
            {
              width: 758,
              height: 758,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--eEYHLqni--/c_scale,w_758/v1/app/content/dybala-my-other-side/dybala-my-other-side-1',
            },
            {
              width: 379,
              height: 379,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--NOJ73h6L--/c_scale,w_379/v1/app/content/dybala-my-other-side/dybala-my-other-side-1',
            },
            {
              width: 190,
              height: 190,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ZgO3_Yz3--/c_scale,w_190/v1/app/content/dybala-my-other-side/dybala-my-other-side-1',
            },
            {
              width: 95,
              height: 95,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--0vWmzzix--/c_scale,w_95/v1/app/content/dybala-my-other-side/dybala-my-other-side-1',
            },
            {
              width: 48,
              height: 48,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--EEEsBbns--/c_scale,w_48/v1/app/content/dybala-my-other-side/dybala-my-other-side-1',
            },
          ],
        },
      ],
      contentTypeName: 'Video',
      duration: 345.28,
    },
    {
      externalId: 'dybala-talks-numbers',
      contentContributors: [
        {
          forename: 'Paulo',
          seoCode: 'paulodybala',
          surname: 'Dybala',
          mediaGroup: [
            {
              usage: 'PROFILE',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--UFVP3ITo--/v1561386276/app/stars/paulodybala/player-index/player-index-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--PYqrjhyB--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--omVyPq1x--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O8pwhSyp--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--RJsRgoTR--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---WEiGhDa--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Rj4wLy4g--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--NcORKOTo--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--VmScKwlJ--/v1561386274/app/stars/paulodybala/player-index/player-index-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ktepon8K--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--T8bw45Ky--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--w31M59U2--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--c1zcVQlB--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--uKoY5q89--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_jloW88O--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XaE169xg--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--cyWkZuYV--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-2',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--rBVX3x0B--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_IgeYBOk--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xc5D_NqC--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Qs-BDG00--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--osyv-qux--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r7XPoMyv--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--q4spcb6j--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Cff2KjJi--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vvX-XH0x--/c_scale,w_3839/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--P966A23d--/c_scale,w_1920/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--pI2Q4AE3--/c_scale,w_960/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--riogy0jw--/c_scale,w_480/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--3Wb1rnOy--/c_scale,w_240/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UeO0tCCc--/c_scale,w_120/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--okY8yuOe--/c_scale,w_60/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                  ],
                },
              ],
            },
            {
              usage: 'BIO',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--fkGJvJdz--/v1561386272/app/stars/paulodybala/bio-background/bio-background-paulodybala-5.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--hNexAXHB--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kZmy-Vgy--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kBiVrv9S--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--lj3tasyI--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--icC2aigW--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r_NgvEWz--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--iOs9urG0--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--8deYo15Z--/v1561386270/app/stars/paulodybala/bio-background/bio-background-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--TCbBv8lE--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--nbhqjDvp--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vo57bFra--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--fzCG5iOA--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--cEJVT6cE--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--BYN8rYih--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XUgnS3v3--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Ycq4OTYZ--/v1561386269/app/stars/paulodybala/bio-background/bio-background-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eKsUIK_6--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XVoS3SED--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ffE2mMY0--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O1sAzewc--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UXxukzem--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4gwVpkKS--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--k8ubPyMc--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--zOPbIWsG--/v1561386268/app/stars/paulodybala/bio-background/bio-background-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eQvcSAa9--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--GfAOQfz8--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kNF5AOEN--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4yzd5fNz--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Nbm2VxGE--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---KmtotUO--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--I11FP2s0--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Sg7f68xZ--/v1561386267/app/stars/paulodybala/bio-background/bio-background-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--zxZQqAX7--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--44EUg7Df--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--QYrdfya2--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kj-2j_Q6--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--wDB6AbJr--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--drDPCeB0--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--CH6RxPEp--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Signature',
                  width: 400,
                  height: 400,
                  format: 'png',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--9qGlnRGo--/v1561386266/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1.png',
                  public_id: 'app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                  media: [
                    {
                      width: 399,
                      height: 399,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ojTLJ81q--/c_scale,w_399/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 200,
                      height: 200,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--AXfFNkin--/c_scale,w_200/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 100,
                      height: 100,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--KJmHxBjP--/c_scale,w_100/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 50,
                      height: 50,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xkyIgZ-6--/c_scale,w_50/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                  ],
                },
              ],
            },
          ],
          starType: 'Footballer',
          externalId: 'paulodybala',
          bio:
            "I wanted to quit football when I was just 15. I had lost my dad to cancer and it felt like the end of the world. I kept going to make up for all the sacrifices he had made for me, and now every time I score I point to the sky to say thank you. When you're a footballer, people judge you without knowing who you really are. I want to change that.",
          avatar:
            'https://res.cloudinary.com/our-star-club/image/authenticated/s--0d043K3P--/v1/app/stars/paulodybala/avatar/avatar-paulodybala',
          starExternalId: 'paulodybala',
        },
      ],
      description:
        'Paulo Dybala reveals the pressure that comes with inheriting iconic shirt numbers from legendary Juventus players such as Andrea Pirlo, Alessandro Del Piero, Roberto Baggio and Zinedine Zidane.',
      descriptionBrief:
        'How much pressure comes with inheriting the shirt number of a legendary player?',
      title: 'Dybala talks numbers',
      titleBrief: 'Dybala talks numbers',
      language: 'en',
      tags: [],
      creatives: [
        {
          mediaUsageType: 'Artwork',
          width: 3840,
          height: 1800,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s---Ijaxndu--/v1565879409/app/content/dybala-talks-numbers/dybala-talks-numbers-4.jpg',
          public_id: 'app/content/dybala-talks-numbers/dybala-talks-numbers-4',
          media: [
            {
              width: 3839,
              height: 1800,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--s1w8vv1A--/c_scale,w_3839/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-4',
            },
            {
              width: 1920,
              height: 900,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--qLf_GLsg--/c_scale,w_1920/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-4',
            },
            {
              width: 960,
              height: 450,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Cr6e-gB7--/c_scale,w_960/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-4',
            },
            {
              width: 480,
              height: 225,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Z2kMboEW--/c_scale,w_480/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-4',
            },
            {
              width: 240,
              height: 113,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--TUeEPUTL--/c_scale,w_240/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-4',
            },
            {
              width: 120,
              height: 57,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--PjpILgSZ--/c_scale,w_120/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-4',
            },
            {
              width: 60,
              height: 29,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--6KCJts0I--/c_scale,w_60/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-4',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 2160,
          height: 3840,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--wedzloSY--/v1565879409/app/content/dybala-talks-numbers/dybala-talks-numbers-5.jpg',
          public_id: 'app/content/dybala-talks-numbers/dybala-talks-numbers-5',
          media: [
            {
              width: 2159,
              height: 3838,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Boh1-T6V--/c_scale,w_2159/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-5',
            },
            {
              width: 1080,
              height: 1919,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ngICEDj2--/c_scale,w_1080/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-5',
            },
            {
              width: 540,
              height: 960,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--5O56WByY--/c_scale,w_540/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-5',
            },
            {
              width: 270,
              height: 480,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--1ZzPy0Ds--/c_scale,w_270/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-5',
            },
            {
              width: 135,
              height: 240,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--GAT478nl--/c_scale,w_135/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-5',
            },
            {
              width: 68,
              height: 120,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ZVUOd7pG--/c_scale,w_68/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-5',
            },
            {
              width: 34,
              height: 60,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--CytvLySo--/c_scale,w_34/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-5',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 2160,
          height: 3076,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s---gDwrvQS--/v1565879409/app/content/dybala-talks-numbers/dybala-talks-numbers-3.jpg',
          public_id: 'app/content/dybala-talks-numbers/dybala-talks-numbers-3',
          media: [
            {
              width: 2159,
              height: 3075,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--mw3S60Xk--/c_scale,w_2159/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-3',
            },
            {
              width: 1080,
              height: 1538,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--H7zjo-35--/c_scale,w_1080/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-3',
            },
            {
              width: 540,
              height: 769,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--tlM3eeTM--/c_scale,w_540/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-3',
            },
            {
              width: 270,
              height: 385,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--YWMsZQ_D--/c_scale,w_270/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-3',
            },
            {
              width: 135,
              height: 193,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--rh15slxQ--/c_scale,w_135/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-3',
            },
            {
              width: 68,
              height: 97,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--dBv3SZUG--/c_scale,w_68/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-3',
            },
            {
              width: 34,
              height: 49,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--4esm5iFx--/c_scale,w_34/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-3',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 2160,
          height: 2160,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--f6N2x8zX--/v1565879409/app/content/dybala-talks-numbers/dybala-talks-numbers-1.jpg',
          public_id: 'app/content/dybala-talks-numbers/dybala-talks-numbers-1',
          media: [
            {
              width: 2159,
              height: 2159,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--o54_IJSR--/c_scale,w_2159/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-1',
            },
            {
              width: 1080,
              height: 1080,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--x52XYIGs--/c_scale,w_1080/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-1',
            },
            {
              width: 540,
              height: 540,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ywr2YQbI--/c_scale,w_540/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-1',
            },
            {
              width: 270,
              height: 270,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--FebyIKaU--/c_scale,w_270/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-1',
            },
            {
              width: 135,
              height: 135,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--AAR0cHWQ--/c_scale,w_135/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-1',
            },
            {
              width: 68,
              height: 68,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s---NWUIgyv--/c_scale,w_68/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-1',
            },
            {
              width: 34,
              height: 34,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--rufbh4Yy--/c_scale,w_34/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-1',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 2160,
          height: 2813,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--fMjfgbWD--/v1565879409/app/content/dybala-talks-numbers/dybala-talks-numbers-2.jpg',
          public_id: 'app/content/dybala-talks-numbers/dybala-talks-numbers-2',
          media: [
            {
              width: 2159,
              height: 2812,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--H7JmgVWf--/c_scale,w_2159/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-2',
            },
            {
              width: 1080,
              height: 1406,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Cu-RBzNQ--/c_scale,w_1080/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-2',
            },
            {
              width: 540,
              height: 703,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--8ptr0TLI--/c_scale,w_540/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-2',
            },
            {
              width: 270,
              height: 352,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--CLr7uvZf--/c_scale,w_270/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-2',
            },
            {
              width: 135,
              height: 176,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--lmpxUzeQ--/c_scale,w_135/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-2',
            },
            {
              width: 68,
              height: 88,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--UjBu5Uqr--/c_scale,w_68/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-2',
            },
            {
              width: 34,
              height: 44,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ivf8LFTc--/c_scale,w_34/v1/app/content/dybala-talks-numbers/dybala-talks-numbers-2',
            },
          ],
        },
      ],
      contentTypeName: 'Video',
      duration: 174.56,
    },
    {
      externalId: 'dybala-night-at-the-museum',
      contentContributors: [
        {
          forename: 'Paulo',
          seoCode: 'paulodybala',
          surname: 'Dybala',
          mediaGroup: [
            {
              usage: 'PROFILE',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--UFVP3ITo--/v1561386276/app/stars/paulodybala/player-index/player-index-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--PYqrjhyB--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--omVyPq1x--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O8pwhSyp--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--RJsRgoTR--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---WEiGhDa--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Rj4wLy4g--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--NcORKOTo--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--VmScKwlJ--/v1561386274/app/stars/paulodybala/player-index/player-index-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ktepon8K--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--T8bw45Ky--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--w31M59U2--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--c1zcVQlB--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--uKoY5q89--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_jloW88O--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XaE169xg--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--cyWkZuYV--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-2',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--rBVX3x0B--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_IgeYBOk--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xc5D_NqC--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Qs-BDG00--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--osyv-qux--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r7XPoMyv--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--q4spcb6j--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Cff2KjJi--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vvX-XH0x--/c_scale,w_3839/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--P966A23d--/c_scale,w_1920/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--pI2Q4AE3--/c_scale,w_960/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--riogy0jw--/c_scale,w_480/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--3Wb1rnOy--/c_scale,w_240/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UeO0tCCc--/c_scale,w_120/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--okY8yuOe--/c_scale,w_60/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                  ],
                },
              ],
            },
            {
              usage: 'BIO',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--fkGJvJdz--/v1561386272/app/stars/paulodybala/bio-background/bio-background-paulodybala-5.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--hNexAXHB--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kZmy-Vgy--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kBiVrv9S--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--lj3tasyI--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--icC2aigW--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r_NgvEWz--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--iOs9urG0--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--8deYo15Z--/v1561386270/app/stars/paulodybala/bio-background/bio-background-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--TCbBv8lE--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--nbhqjDvp--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vo57bFra--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--fzCG5iOA--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--cEJVT6cE--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--BYN8rYih--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XUgnS3v3--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Ycq4OTYZ--/v1561386269/app/stars/paulodybala/bio-background/bio-background-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eKsUIK_6--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XVoS3SED--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ffE2mMY0--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O1sAzewc--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UXxukzem--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4gwVpkKS--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--k8ubPyMc--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--zOPbIWsG--/v1561386268/app/stars/paulodybala/bio-background/bio-background-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eQvcSAa9--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--GfAOQfz8--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kNF5AOEN--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4yzd5fNz--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Nbm2VxGE--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---KmtotUO--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--I11FP2s0--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Sg7f68xZ--/v1561386267/app/stars/paulodybala/bio-background/bio-background-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--zxZQqAX7--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--44EUg7Df--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--QYrdfya2--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kj-2j_Q6--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--wDB6AbJr--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--drDPCeB0--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--CH6RxPEp--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Signature',
                  width: 400,
                  height: 400,
                  format: 'png',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--9qGlnRGo--/v1561386266/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1.png',
                  public_id: 'app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                  media: [
                    {
                      width: 399,
                      height: 399,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ojTLJ81q--/c_scale,w_399/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 200,
                      height: 200,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--AXfFNkin--/c_scale,w_200/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 100,
                      height: 100,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--KJmHxBjP--/c_scale,w_100/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 50,
                      height: 50,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xkyIgZ-6--/c_scale,w_50/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                  ],
                },
              ],
            },
          ],
          starType: 'Footballer',
          externalId: 'paulodybala',
          bio:
            "I wanted to quit football when I was just 15. I had lost my dad to cancer and it felt like the end of the world. I kept going to make up for all the sacrifices he had made for me, and now every time I score I point to the sky to say thank you. When you're a footballer, people judge you without knowing who you really are. I want to change that.",
          avatar:
            'https://res.cloudinary.com/our-star-club/image/authenticated/s--0d043K3P--/v1/app/stars/paulodybala/avatar/avatar-paulodybala',
          starExternalId: 'paulodybala',
        },
      ],
      description:
        "Paulo Dybala comes face-to-face with the legendary Egyptian pharaoh, Ramsses The Great as he and his girlfriend Oriana take a guided tour of Turin's Egyptian museum.",
      descriptionBrief:
        "Paulo Dybala comes face-to-face with the legendary Egyptian pharaoh, Ramsses The Great as he and his girlfriend Oriana take a guided tour of Turin's Egyptian museum.",
      title: 'Dybala: Night at the Museum',
      titleBrief: 'Night at the Museum',
      language: 'en',
      tags: [],
      creatives: [
        {
          mediaUsageType: 'Artwork',
          width: 478,
          height: 681,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--uMaPqamT--/v1565879408/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-1.jpg',
          public_id: 'app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-1',
          media: [
            {
              width: 477,
              height: 680,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--5jcaKLZ5--/c_scale,w_477/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-1',
            },
            {
              width: 239,
              height: 340,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--v-0KRkzG--/c_scale,w_239/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-1',
            },
            {
              width: 120,
              height: 170,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s---DC7zpEL--/c_scale,w_120/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-1',
            },
            {
              width: 60,
              height: 85,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--WrqmZ-iq--/c_scale,w_60/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-1',
            },
            {
              width: 30,
              height: 43,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--KjY4StCI--/c_scale,w_30/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-1',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 683,
          height: 683,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--4jjmfteM--/v1565879408/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-2.jpg',
          public_id: 'app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-2',
          media: [
            {
              width: 682,
              height: 682,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--U4JZYNUz--/c_scale,w_682/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-2',
            },
            {
              width: 341,
              height: 341,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--_3w9ByjE--/c_scale,w_341/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-2',
            },
            {
              width: 171,
              height: 171,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--LG-PniHA--/c_scale,w_171/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-2',
            },
            {
              width: 86,
              height: 86,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--4WWBdmz---/c_scale,w_86/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-2',
            },
            {
              width: 43,
              height: 43,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--tSgEmBKj--/c_scale,w_43/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-2',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1097,
          height: 514,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--J0DzScqe--/v1565879408/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-4.jpg',
          public_id: 'app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-4',
          media: [
            {
              width: 1096,
              height: 514,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--YlIIjaCe--/c_scale,w_1096/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-4',
            },
            {
              width: 548,
              height: 257,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--V4K776mI--/c_scale,w_548/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-4',
            },
            {
              width: 274,
              height: 129,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--DT9virwa--/c_scale,w_274/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-4',
            },
            {
              width: 137,
              height: 65,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--dj-8OUWf--/c_scale,w_137/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-4',
            },
            {
              width: 69,
              height: 33,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--e2Rx3qSh--/c_scale,w_69/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-4',
            },
            {
              width: 35,
              height: 17,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--PsDPJaDz--/c_scale,w_35/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-4',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 523,
          height: 681,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--tQYyhCIz--/v1565879408/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-5.jpg',
          public_id: 'app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-5',
          media: [
            {
              width: 522,
              height: 680,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--GpSKs0mM--/c_scale,w_522/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-5',
            },
            {
              width: 261,
              height: 340,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Ep2GAvzG--/c_scale,w_261/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-5',
            },
            {
              width: 131,
              height: 170,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--uEvMsVl8--/c_scale,w_131/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-5',
            },
            {
              width: 66,
              height: 85,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ybBs1xEP--/c_scale,w_66/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-5',
            },
            {
              width: 33,
              height: 43,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--_Wymi5m7--/c_scale,w_33/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-5',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1097,
          height: 617,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--FlCVONW0--/v1565879408/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-3.jpg',
          public_id: 'app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-3',
          media: [
            {
              width: 1096,
              height: 616,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--FWeGAoE1--/c_scale,w_1096/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-3',
            },
            {
              width: 548,
              height: 308,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--hwHmuICZ--/c_scale,w_548/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-3',
            },
            {
              width: 274,
              height: 154,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--tvoPL4Cs--/c_scale,w_274/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-3',
            },
            {
              width: 137,
              height: 77,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--yIsdljgx--/c_scale,w_137/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-3',
            },
            {
              width: 69,
              height: 39,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--oAD4aVUX--/c_scale,w_69/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-3',
            },
            {
              width: 35,
              height: 20,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--2TdlE31l--/c_scale,w_35/v1/app/content/dybala-night-at-the-museum/dybala-night-at-the-museum-3',
            },
          ],
        },
      ],
      contentTypeName: 'Video',
      duration: 243.68,
    },
    {
      externalId: 'dybala-playerprofile',
      contentContributors: [
        {
          forename: 'Paulo',
          seoCode: 'paulodybala',
          surname: 'Dybala',
          mediaGroup: [
            {
              usage: 'PROFILE',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--UFVP3ITo--/v1561386276/app/stars/paulodybala/player-index/player-index-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--PYqrjhyB--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--omVyPq1x--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O8pwhSyp--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--RJsRgoTR--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---WEiGhDa--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Rj4wLy4g--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--NcORKOTo--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--VmScKwlJ--/v1561386274/app/stars/paulodybala/player-index/player-index-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ktepon8K--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--T8bw45Ky--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--w31M59U2--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--c1zcVQlB--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--uKoY5q89--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_jloW88O--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XaE169xg--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--cyWkZuYV--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-2',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--rBVX3x0B--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_IgeYBOk--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xc5D_NqC--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Qs-BDG00--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--osyv-qux--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r7XPoMyv--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--q4spcb6j--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Cff2KjJi--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vvX-XH0x--/c_scale,w_3839/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--P966A23d--/c_scale,w_1920/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--pI2Q4AE3--/c_scale,w_960/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--riogy0jw--/c_scale,w_480/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--3Wb1rnOy--/c_scale,w_240/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UeO0tCCc--/c_scale,w_120/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--okY8yuOe--/c_scale,w_60/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                  ],
                },
              ],
            },
            {
              usage: 'BIO',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--fkGJvJdz--/v1561386272/app/stars/paulodybala/bio-background/bio-background-paulodybala-5.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--hNexAXHB--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kZmy-Vgy--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kBiVrv9S--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--lj3tasyI--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--icC2aigW--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r_NgvEWz--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--iOs9urG0--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--8deYo15Z--/v1561386270/app/stars/paulodybala/bio-background/bio-background-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--TCbBv8lE--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--nbhqjDvp--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vo57bFra--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--fzCG5iOA--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--cEJVT6cE--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--BYN8rYih--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XUgnS3v3--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Ycq4OTYZ--/v1561386269/app/stars/paulodybala/bio-background/bio-background-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eKsUIK_6--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XVoS3SED--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ffE2mMY0--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O1sAzewc--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UXxukzem--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4gwVpkKS--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--k8ubPyMc--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--zOPbIWsG--/v1561386268/app/stars/paulodybala/bio-background/bio-background-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eQvcSAa9--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--GfAOQfz8--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kNF5AOEN--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4yzd5fNz--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Nbm2VxGE--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---KmtotUO--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--I11FP2s0--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Sg7f68xZ--/v1561386267/app/stars/paulodybala/bio-background/bio-background-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--zxZQqAX7--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--44EUg7Df--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--QYrdfya2--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kj-2j_Q6--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--wDB6AbJr--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--drDPCeB0--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--CH6RxPEp--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Signature',
                  width: 400,
                  height: 400,
                  format: 'png',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--9qGlnRGo--/v1561386266/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1.png',
                  public_id: 'app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                  media: [
                    {
                      width: 399,
                      height: 399,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ojTLJ81q--/c_scale,w_399/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 200,
                      height: 200,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--AXfFNkin--/c_scale,w_200/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 100,
                      height: 100,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--KJmHxBjP--/c_scale,w_100/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 50,
                      height: 50,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xkyIgZ-6--/c_scale,w_50/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                  ],
                },
              ],
            },
          ],
          starType: 'Footballer',
          externalId: 'paulodybala',
          bio:
            "I wanted to quit football when I was just 15. I had lost my dad to cancer and it felt like the end of the world. I kept going to make up for all the sacrifices he had made for me, and now every time I score I point to the sky to say thank you. When you're a footballer, people judge you without knowing who you really are. I want to change that.",
          avatar:
            'https://res.cloudinary.com/our-star-club/image/authenticated/s--0d043K3P--/v1/app/stars/paulodybala/avatar/avatar-paulodybala',
          starExternalId: 'paulodybala',
        },
      ],
      description:
        "Follow Paulo Dybala's journey as he overcomes the daunting challenge of moving to a new continent as a teenage to become a multiple champion in his adopted country.",
      descriptionBrief:
        "Follow Paulo Dybala's journey as he overcomes the daunting challenge of moving to a new continent as a teenage to become a multiple champion in his adopted country.",
      title: 'Paulo Dybala: Player Profile',
      titleBrief: 'Dybala Profile',
      language: 'en',
      tags: [],
      creatives: [
        {
          mediaUsageType: 'Artwork',
          width: 3840,
          height: 1800,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--14I_Gmyd--/v1565879408/app/content/dybala-playerprofile/dybala-playerprofile-5.jpg',
          public_id: 'app/content/dybala-playerprofile/dybala-playerprofile-5',
          media: [
            {
              width: 3839,
              height: 1800,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--PcjWTm_6--/c_scale,w_3839/v1/app/content/dybala-playerprofile/dybala-playerprofile-5',
            },
            {
              width: 1920,
              height: 900,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--5Zjt407T--/c_scale,w_1920/v1/app/content/dybala-playerprofile/dybala-playerprofile-5',
            },
            {
              width: 960,
              height: 450,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--RPx_D7_O--/c_scale,w_960/v1/app/content/dybala-playerprofile/dybala-playerprofile-5',
            },
            {
              width: 480,
              height: 225,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--a5bWv3G5--/c_scale,w_480/v1/app/content/dybala-playerprofile/dybala-playerprofile-5',
            },
            {
              width: 240,
              height: 113,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--cQ3jCHGl--/c_scale,w_240/v1/app/content/dybala-playerprofile/dybala-playerprofile-5',
            },
            {
              width: 120,
              height: 57,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--f9CgN-iK--/c_scale,w_120/v1/app/content/dybala-playerprofile/dybala-playerprofile-5',
            },
            {
              width: 60,
              height: 29,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ycaqPutp--/c_scale,w_60/v1/app/content/dybala-playerprofile/dybala-playerprofile-5',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 2160,
          height: 3076,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--OneNEKHS--/v1565879408/app/content/dybala-playerprofile/dybala-playerprofile-1.jpg',
          public_id: 'app/content/dybala-playerprofile/dybala-playerprofile-1',
          media: [
            {
              width: 2159,
              height: 3075,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--MnH0I4Fn--/c_scale,w_2159/v1/app/content/dybala-playerprofile/dybala-playerprofile-1',
            },
            {
              width: 1080,
              height: 1538,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--umYBC0h1--/c_scale,w_1080/v1/app/content/dybala-playerprofile/dybala-playerprofile-1',
            },
            {
              width: 540,
              height: 769,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--KF3zvxan--/c_scale,w_540/v1/app/content/dybala-playerprofile/dybala-playerprofile-1',
            },
            {
              width: 270,
              height: 385,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--oGOeIsRY--/c_scale,w_270/v1/app/content/dybala-playerprofile/dybala-playerprofile-1',
            },
            {
              width: 135,
              height: 193,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--7X9M50SU--/c_scale,w_135/v1/app/content/dybala-playerprofile/dybala-playerprofile-1',
            },
            {
              width: 68,
              height: 97,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--YlAejWyD--/c_scale,w_68/v1/app/content/dybala-playerprofile/dybala-playerprofile-1',
            },
            {
              width: 34,
              height: 49,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--wmxf5n23--/c_scale,w_34/v1/app/content/dybala-playerprofile/dybala-playerprofile-1',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 2160,
          height: 2813,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--wGZvopar--/v1565879408/app/content/dybala-playerprofile/dybala-playerprofile-4.jpg',
          public_id: 'app/content/dybala-playerprofile/dybala-playerprofile-4',
          media: [
            {
              width: 2159,
              height: 2812,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--BuzJJGfG--/c_scale,w_2159/v1/app/content/dybala-playerprofile/dybala-playerprofile-4',
            },
            {
              width: 1080,
              height: 1406,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--9n700dBH--/c_scale,w_1080/v1/app/content/dybala-playerprofile/dybala-playerprofile-4',
            },
            {
              width: 540,
              height: 703,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--SSk344Ge--/c_scale,w_540/v1/app/content/dybala-playerprofile/dybala-playerprofile-4',
            },
            {
              width: 270,
              height: 352,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--1q7FekY_--/c_scale,w_270/v1/app/content/dybala-playerprofile/dybala-playerprofile-4',
            },
            {
              width: 135,
              height: 176,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--GuwobYhM--/c_scale,w_135/v1/app/content/dybala-playerprofile/dybala-playerprofile-4',
            },
            {
              width: 68,
              height: 88,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--W581PUpQ--/c_scale,w_68/v1/app/content/dybala-playerprofile/dybala-playerprofile-4',
            },
            {
              width: 34,
              height: 44,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--F9rS6bya--/c_scale,w_34/v1/app/content/dybala-playerprofile/dybala-playerprofile-4',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 2160,
          height: 2160,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--Po8eHGVs--/v1565879408/app/content/dybala-playerprofile/dybala-playerprofile-3.jpg',
          public_id: 'app/content/dybala-playerprofile/dybala-playerprofile-3',
          media: [
            {
              width: 2159,
              height: 2159,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--reij6GnU--/c_scale,w_2159/v1/app/content/dybala-playerprofile/dybala-playerprofile-3',
            },
            {
              width: 1080,
              height: 1080,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Y4aw0xTK--/c_scale,w_1080/v1/app/content/dybala-playerprofile/dybala-playerprofile-3',
            },
            {
              width: 540,
              height: 540,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--twIB9F1Q--/c_scale,w_540/v1/app/content/dybala-playerprofile/dybala-playerprofile-3',
            },
            {
              width: 270,
              height: 270,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ZS3Ix4OT--/c_scale,w_270/v1/app/content/dybala-playerprofile/dybala-playerprofile-3',
            },
            {
              width: 135,
              height: 135,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--j5ogC8Sz--/c_scale,w_135/v1/app/content/dybala-playerprofile/dybala-playerprofile-3',
            },
            {
              width: 68,
              height: 68,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--kjgrGsMX--/c_scale,w_68/v1/app/content/dybala-playerprofile/dybala-playerprofile-3',
            },
            {
              width: 34,
              height: 34,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--1E7Ol1Z7--/c_scale,w_34/v1/app/content/dybala-playerprofile/dybala-playerprofile-3',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 2160,
          height: 3840,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--d3YlK7rs--/v1565879408/app/content/dybala-playerprofile/dybala-playerprofile-2.jpg',
          public_id: 'app/content/dybala-playerprofile/dybala-playerprofile-2',
          media: [
            {
              width: 2159,
              height: 3838,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--fKp_4XgR--/c_scale,w_2159/v1/app/content/dybala-playerprofile/dybala-playerprofile-2',
            },
            {
              width: 1080,
              height: 1919,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--VZvU0zbi--/c_scale,w_1080/v1/app/content/dybala-playerprofile/dybala-playerprofile-2',
            },
            {
              width: 540,
              height: 960,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--o4vdk6Ia--/c_scale,w_540/v1/app/content/dybala-playerprofile/dybala-playerprofile-2',
            },
            {
              width: 270,
              height: 480,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--P3IvXvzV--/c_scale,w_270/v1/app/content/dybala-playerprofile/dybala-playerprofile-2',
            },
            {
              width: 135,
              height: 240,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--h-wU6J_j--/c_scale,w_135/v1/app/content/dybala-playerprofile/dybala-playerprofile-2',
            },
            {
              width: 68,
              height: 120,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--u92nY3gp--/c_scale,w_68/v1/app/content/dybala-playerprofile/dybala-playerprofile-2',
            },
            {
              width: 34,
              height: 60,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--FhhyzG2K--/c_scale,w_34/v1/app/content/dybala-playerprofile/dybala-playerprofile-2',
            },
          ],
        },
      ],
      contentTypeName: 'Video',
      duration: 92.16,
    },
    {
      externalId: 'dybala-icons',
      contentContributors: [
        {
          forename: 'Paulo',
          seoCode: 'paulodybala',
          surname: 'Dybala',
          mediaGroup: [
            {
              usage: 'PROFILE',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--UFVP3ITo--/v1561386276/app/stars/paulodybala/player-index/player-index-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--PYqrjhyB--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--omVyPq1x--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O8pwhSyp--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--RJsRgoTR--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---WEiGhDa--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Rj4wLy4g--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--NcORKOTo--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--VmScKwlJ--/v1561386274/app/stars/paulodybala/player-index/player-index-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ktepon8K--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--T8bw45Ky--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--w31M59U2--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--c1zcVQlB--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--uKoY5q89--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_jloW88O--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XaE169xg--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--cyWkZuYV--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-2',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--rBVX3x0B--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_IgeYBOk--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xc5D_NqC--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Qs-BDG00--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--osyv-qux--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r7XPoMyv--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--q4spcb6j--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Cff2KjJi--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vvX-XH0x--/c_scale,w_3839/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--P966A23d--/c_scale,w_1920/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--pI2Q4AE3--/c_scale,w_960/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--riogy0jw--/c_scale,w_480/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--3Wb1rnOy--/c_scale,w_240/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UeO0tCCc--/c_scale,w_120/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--okY8yuOe--/c_scale,w_60/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                  ],
                },
              ],
            },
            {
              usage: 'BIO',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--fkGJvJdz--/v1561386272/app/stars/paulodybala/bio-background/bio-background-paulodybala-5.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--hNexAXHB--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kZmy-Vgy--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kBiVrv9S--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--lj3tasyI--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--icC2aigW--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r_NgvEWz--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--iOs9urG0--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--8deYo15Z--/v1561386270/app/stars/paulodybala/bio-background/bio-background-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--TCbBv8lE--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--nbhqjDvp--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vo57bFra--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--fzCG5iOA--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--cEJVT6cE--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--BYN8rYih--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XUgnS3v3--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Ycq4OTYZ--/v1561386269/app/stars/paulodybala/bio-background/bio-background-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eKsUIK_6--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XVoS3SED--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ffE2mMY0--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O1sAzewc--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UXxukzem--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4gwVpkKS--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--k8ubPyMc--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--zOPbIWsG--/v1561386268/app/stars/paulodybala/bio-background/bio-background-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eQvcSAa9--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--GfAOQfz8--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kNF5AOEN--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4yzd5fNz--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Nbm2VxGE--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---KmtotUO--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--I11FP2s0--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Sg7f68xZ--/v1561386267/app/stars/paulodybala/bio-background/bio-background-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--zxZQqAX7--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--44EUg7Df--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--QYrdfya2--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kj-2j_Q6--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--wDB6AbJr--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--drDPCeB0--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--CH6RxPEp--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Signature',
                  width: 400,
                  height: 400,
                  format: 'png',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--9qGlnRGo--/v1561386266/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1.png',
                  public_id: 'app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                  media: [
                    {
                      width: 399,
                      height: 399,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ojTLJ81q--/c_scale,w_399/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 200,
                      height: 200,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--AXfFNkin--/c_scale,w_200/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 100,
                      height: 100,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--KJmHxBjP--/c_scale,w_100/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 50,
                      height: 50,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xkyIgZ-6--/c_scale,w_50/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                  ],
                },
              ],
            },
          ],
          starType: 'Footballer',
          externalId: 'paulodybala',
          bio:
            "I wanted to quit football when I was just 15. I had lost my dad to cancer and it felt like the end of the world. I kept going to make up for all the sacrifices he had made for me, and now every time I score I point to the sky to say thank you. When you're a footballer, people judge you without knowing who you really are. I want to change that.",
          avatar:
            'https://res.cloudinary.com/our-star-club/image/authenticated/s--0d043K3P--/v1/app/stars/paulodybala/avatar/avatar-paulodybala',
          starExternalId: 'paulodybala',
        },
      ],
      description:
        'Paulo Dybala names the players who have provided the inspiration for his transformation into La Joya and picks out legends of the game he would loved to have shared a pitch with.',
      descriptionBrief:
        'Paulo Dybala names the players who have provided the inspiration for his transformation into La Joya and picks out legends of the game he would loved to have shared a pitch with.',
      title: 'Dybala: Icons',
      titleBrief: 'Icons',
      language: 'en',
      tags: [],
      creatives: [
        {
          mediaUsageType: 'Artwork',
          width: 1199,
          height: 674,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--3myerJp9--/v1565879407/app/content/dybala-icons/dybala-icons-5.jpg',
          public_id: 'app/content/dybala-icons/dybala-icons-5',
          media: [
            {
              width: 1198,
              height: 673,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--OWYLALNZ--/c_scale,w_1198/v1/app/content/dybala-icons/dybala-icons-5',
            },
            {
              width: 599,
              height: 337,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--kt1oQr7T--/c_scale,w_599/v1/app/content/dybala-icons/dybala-icons-5',
            },
            {
              width: 300,
              height: 169,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ZYkIrpdC--/c_scale,w_300/v1/app/content/dybala-icons/dybala-icons-5',
            },
            {
              width: 150,
              height: 85,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--se70M0nr--/c_scale,w_150/v1/app/content/dybala-icons/dybala-icons-5',
            },
            {
              width: 75,
              height: 43,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--1Y8HwaLN--/c_scale,w_75/v1/app/content/dybala-icons/dybala-icons-5',
            },
            {
              width: 38,
              height: 22,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--nl4h9lxu--/c_scale,w_38/v1/app/content/dybala-icons/dybala-icons-5',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 763,
          height: 763,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--HeW4qsvk--/v1565879407/app/content/dybala-icons/dybala-icons-2.jpg',
          public_id: 'app/content/dybala-icons/dybala-icons-2',
          media: [
            {
              width: 762,
              height: 762,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--bcHVInCU--/c_scale,w_762/v1/app/content/dybala-icons/dybala-icons-2',
            },
            {
              width: 381,
              height: 381,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--MfBzoAvb--/c_scale,w_381/v1/app/content/dybala-icons/dybala-icons-2',
            },
            {
              width: 191,
              height: 191,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--VPvmp_Vy--/c_scale,w_191/v1/app/content/dybala-icons/dybala-icons-2',
            },
            {
              width: 96,
              height: 96,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--VzuCE43q--/c_scale,w_96/v1/app/content/dybala-icons/dybala-icons-2',
            },
            {
              width: 48,
              height: 48,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--6jn80qWw--/c_scale,w_48/v1/app/content/dybala-icons/dybala-icons-2',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 590,
          height: 840,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s---7WhYamo--/v1565879407/app/content/dybala-icons/dybala-icons-3.jpg',
          public_id: 'app/content/dybala-icons/dybala-icons-3',
          media: [
            {
              width: 589,
              height: 839,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--27gM0OW6--/c_scale,w_589/v1/app/content/dybala-icons/dybala-icons-3',
            },
            {
              width: 295,
              height: 420,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--rKyG1dBo--/c_scale,w_295/v1/app/content/dybala-icons/dybala-icons-3',
            },
            {
              width: 148,
              height: 210,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--CB0kGSWj--/c_scale,w_148/v1/app/content/dybala-icons/dybala-icons-3',
            },
            {
              width: 74,
              height: 105,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--LogxcbCO--/c_scale,w_74/v1/app/content/dybala-icons/dybala-icons-3',
            },
            {
              width: 37,
              height: 53,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--eJuQrJtV--/c_scale,w_37/v1/app/content/dybala-icons/dybala-icons-3',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 617,
          height: 803,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--cchM91LE--/v1565879407/app/content/dybala-icons/dybala-icons-1.jpg',
          public_id: 'app/content/dybala-icons/dybala-icons-1',
          media: [
            {
              width: 616,
              height: 802,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--memezp_L--/c_scale,w_616/v1/app/content/dybala-icons/dybala-icons-1',
            },
            {
              width: 308,
              height: 401,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--qKJf8e6W--/c_scale,w_308/v1/app/content/dybala-icons/dybala-icons-1',
            },
            {
              width: 154,
              height: 201,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--P5nO7hVk--/c_scale,w_154/v1/app/content/dybala-icons/dybala-icons-1',
            },
            {
              width: 77,
              height: 101,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--epk3vOQq--/c_scale,w_77/v1/app/content/dybala-icons/dybala-icons-1',
            },
            {
              width: 39,
              height: 51,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--eG1lF_Yh--/c_scale,w_39/v1/app/content/dybala-icons/dybala-icons-1',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1199,
          height: 562,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--1Xp43v3x--/v1565879407/app/content/dybala-icons/dybala-icons-4.jpg',
          public_id: 'app/content/dybala-icons/dybala-icons-4',
          media: [
            {
              width: 1198,
              height: 562,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Esx_089C--/c_scale,w_1198/v1/app/content/dybala-icons/dybala-icons-4',
            },
            {
              width: 599,
              height: 281,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--CfzyqYuD--/c_scale,w_599/v1/app/content/dybala-icons/dybala-icons-4',
            },
            {
              width: 300,
              height: 141,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--IEa9bXli--/c_scale,w_300/v1/app/content/dybala-icons/dybala-icons-4',
            },
            {
              width: 150,
              height: 71,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--IZTeuB6U--/c_scale,w_150/v1/app/content/dybala-icons/dybala-icons-4',
            },
            {
              width: 75,
              height: 36,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ql9rXW4v--/c_scale,w_75/v1/app/content/dybala-icons/dybala-icons-4',
            },
            {
              width: 38,
              height: 18,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--oVLwNICG--/c_scale,w_38/v1/app/content/dybala-icons/dybala-icons-4',
            },
          ],
        },
      ],
      contentTypeName: 'Video',
      duration: 208.96,
    },
    {
      externalId: 'dybala-swept',
      contentContributors: [
        {
          forename: 'Paulo',
          seoCode: 'paulodybala',
          surname: 'Dybala',
          mediaGroup: [
            {
              usage: 'PROFILE',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--UFVP3ITo--/v1561386276/app/stars/paulodybala/player-index/player-index-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--PYqrjhyB--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--omVyPq1x--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O8pwhSyp--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--RJsRgoTR--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---WEiGhDa--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Rj4wLy4g--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--NcORKOTo--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--VmScKwlJ--/v1561386274/app/stars/paulodybala/player-index/player-index-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ktepon8K--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--T8bw45Ky--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--w31M59U2--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--c1zcVQlB--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--uKoY5q89--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_jloW88O--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XaE169xg--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--cyWkZuYV--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-2',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--rBVX3x0B--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_IgeYBOk--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xc5D_NqC--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Qs-BDG00--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--osyv-qux--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r7XPoMyv--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--q4spcb6j--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Cff2KjJi--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vvX-XH0x--/c_scale,w_3839/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--P966A23d--/c_scale,w_1920/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--pI2Q4AE3--/c_scale,w_960/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--riogy0jw--/c_scale,w_480/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--3Wb1rnOy--/c_scale,w_240/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UeO0tCCc--/c_scale,w_120/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--okY8yuOe--/c_scale,w_60/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                  ],
                },
              ],
            },
            {
              usage: 'BIO',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--fkGJvJdz--/v1561386272/app/stars/paulodybala/bio-background/bio-background-paulodybala-5.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--hNexAXHB--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kZmy-Vgy--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kBiVrv9S--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--lj3tasyI--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--icC2aigW--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r_NgvEWz--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--iOs9urG0--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--8deYo15Z--/v1561386270/app/stars/paulodybala/bio-background/bio-background-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--TCbBv8lE--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--nbhqjDvp--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vo57bFra--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--fzCG5iOA--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--cEJVT6cE--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--BYN8rYih--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XUgnS3v3--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Ycq4OTYZ--/v1561386269/app/stars/paulodybala/bio-background/bio-background-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eKsUIK_6--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XVoS3SED--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ffE2mMY0--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O1sAzewc--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UXxukzem--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4gwVpkKS--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--k8ubPyMc--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--zOPbIWsG--/v1561386268/app/stars/paulodybala/bio-background/bio-background-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eQvcSAa9--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--GfAOQfz8--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kNF5AOEN--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4yzd5fNz--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Nbm2VxGE--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---KmtotUO--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--I11FP2s0--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Sg7f68xZ--/v1561386267/app/stars/paulodybala/bio-background/bio-background-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--zxZQqAX7--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--44EUg7Df--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--QYrdfya2--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kj-2j_Q6--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--wDB6AbJr--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--drDPCeB0--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--CH6RxPEp--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Signature',
                  width: 400,
                  height: 400,
                  format: 'png',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--9qGlnRGo--/v1561386266/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1.png',
                  public_id: 'app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                  media: [
                    {
                      width: 399,
                      height: 399,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ojTLJ81q--/c_scale,w_399/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 200,
                      height: 200,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--AXfFNkin--/c_scale,w_200/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 100,
                      height: 100,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--KJmHxBjP--/c_scale,w_100/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 50,
                      height: 50,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xkyIgZ-6--/c_scale,w_50/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                  ],
                },
              ],
            },
          ],
          starType: 'Footballer',
          externalId: 'paulodybala',
          bio:
            "I wanted to quit football when I was just 15. I had lost my dad to cancer and it felt like the end of the world. I kept going to make up for all the sacrifices he had made for me, and now every time I score I point to the sky to say thank you. When you're a footballer, people judge you without knowing who you really are. I want to change that.",
          avatar:
            'https://res.cloudinary.com/our-star-club/image/authenticated/s--0d043K3P--/v1/app/stars/paulodybala/avatar/avatar-paulodybala',
          starExternalId: 'paulodybala',
        },
      ],
      description:
        'Reggio Emilia, 17 September 2017: Paulo Dybala scores the first of three goals against Sassuolo with a sweeping strike from outside the area.',
      descriptionBrief:
        'Reggio Emilia, 17 September 2017: Paulo Dybala scores the first of three goals against Sassuolo with a sweeping strike from outside the area.',
      title: 'Dybala: Swept',
      titleBrief: 'Swept',
      language: 'en',
      tags: [],
      creatives: [
        {
          mediaUsageType: 'Artwork',
          width: 2257,
          height: 1064,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--_tslQW8h--/v1565879409/app/content/dybala-swept/dybala-swept-2.jpg',
          public_id: 'app/content/dybala-swept/dybala-swept-2',
          media: [
            {
              width: 2256,
              height: 1064,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--f3kWjfeT--/c_scale,w_2256/v1/app/content/dybala-swept/dybala-swept-2',
            },
            {
              width: 1128,
              height: 532,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--FW0IizI6--/c_scale,w_1128/v1/app/content/dybala-swept/dybala-swept-2',
            },
            {
              width: 564,
              height: 266,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--pG6kb_jg--/c_scale,w_564/v1/app/content/dybala-swept/dybala-swept-2',
            },
            {
              width: 282,
              height: 133,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--dfRF9DFt--/c_scale,w_282/v1/app/content/dybala-swept/dybala-swept-2',
            },
            {
              width: 141,
              height: 67,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--QJ3HDQoE--/c_scale,w_141/v1/app/content/dybala-swept/dybala-swept-2',
            },
            {
              width: 71,
              height: 34,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--V-D3PBF8--/c_scale,w_71/v1/app/content/dybala-swept/dybala-swept-2',
            },
            {
              width: 36,
              height: 17,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--3WEKukrk--/c_scale,w_36/v1/app/content/dybala-swept/dybala-swept-2',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1451,
          height: 2067,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--xj1Lxj8X--/v1565879409/app/content/dybala-swept/dybala-swept-3.jpg',
          public_id: 'app/content/dybala-swept/dybala-swept-3',
          media: [
            {
              width: 1450,
              height: 2066,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--_Yp43SlD--/c_scale,w_1450/v1/app/content/dybala-swept/dybala-swept-3',
            },
            {
              width: 725,
              height: 1033,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ftC1xHzB--/c_scale,w_725/v1/app/content/dybala-swept/dybala-swept-3',
            },
            {
              width: 363,
              height: 517,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--ALAqR6kr--/c_scale,w_363/v1/app/content/dybala-swept/dybala-swept-3',
            },
            {
              width: 182,
              height: 259,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--LW7Q5XZ6--/c_scale,w_182/v1/app/content/dybala-swept/dybala-swept-3',
            },
            {
              width: 91,
              height: 130,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--K37X7xOF--/c_scale,w_91/v1/app/content/dybala-swept/dybala-swept-3',
            },
            {
              width: 46,
              height: 65,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--l1hPNlTy--/c_scale,w_46/v1/app/content/dybala-swept/dybala-swept-3',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1587,
          height: 2067,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--Jr6OT_kU--/v1565879408/app/content/dybala-swept/dybala-swept-1.jpg',
          public_id: 'app/content/dybala-swept/dybala-swept-1',
          media: [
            {
              width: 1586,
              height: 2066,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--o3jbJsgl--/c_scale,w_1586/v1/app/content/dybala-swept/dybala-swept-1',
            },
            {
              width: 793,
              height: 1033,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--KxBqum99--/c_scale,w_793/v1/app/content/dybala-swept/dybala-swept-1',
            },
            {
              width: 397,
              height: 517,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Q8TJ8eXh--/c_scale,w_397/v1/app/content/dybala-swept/dybala-swept-1',
            },
            {
              width: 199,
              height: 259,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--mVFEqL-0--/c_scale,w_199/v1/app/content/dybala-swept/dybala-swept-1',
            },
            {
              width: 100,
              height: 130,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--4eETkeYf--/c_scale,w_100/v1/app/content/dybala-swept/dybala-swept-1',
            },
            {
              width: 50,
              height: 65,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--DR6RfhRM--/c_scale,w_50/v1/app/content/dybala-swept/dybala-swept-1',
            },
          ],
        },
      ],
      contentTypeName: 'Video',
      duration: 13.48,
    },
    {
      externalId: 'dybala-fan-gets-a-prize-to-treasure',
      contentContributors: [
        {
          forename: 'Paulo',
          seoCode: 'paulodybala',
          surname: 'Dybala',
          mediaGroup: [
            {
              usage: 'PROFILE',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--UFVP3ITo--/v1561386276/app/stars/paulodybala/player-index/player-index-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--PYqrjhyB--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--omVyPq1x--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O8pwhSyp--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--RJsRgoTR--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---WEiGhDa--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Rj4wLy4g--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--NcORKOTo--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--VmScKwlJ--/v1561386274/app/stars/paulodybala/player-index/player-index-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ktepon8K--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--T8bw45Ky--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--w31M59U2--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--c1zcVQlB--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--uKoY5q89--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_jloW88O--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XaE169xg--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--cyWkZuYV--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-2',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--rBVX3x0B--/c_scale,w_2159/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--_IgeYBOk--/c_scale,w_1080/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xc5D_NqC--/c_scale,w_540/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Qs-BDG00--/c_scale,w_270/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--osyv-qux--/c_scale,w_135/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r7XPoMyv--/c_scale,w_68/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--q4spcb6j--/c_scale,w_34/v1/app/stars/paulodybala/player-index/player-index-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Cff2KjJi--/v1561386273/app/stars/paulodybala/player-index/player-index-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/player-index/player-index-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vvX-XH0x--/c_scale,w_3839/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--P966A23d--/c_scale,w_1920/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--pI2Q4AE3--/c_scale,w_960/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--riogy0jw--/c_scale,w_480/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--3Wb1rnOy--/c_scale,w_240/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UeO0tCCc--/c_scale,w_120/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--okY8yuOe--/c_scale,w_60/v1/app/stars/paulodybala/player-index/player-index-paulodybala-1',
                    },
                  ],
                },
              ],
            },
            {
              usage: 'BIO',
              creatives: [
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--fkGJvJdz--/v1561386272/app/stars/paulodybala/bio-background/bio-background-paulodybala-5.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--hNexAXHB--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kZmy-Vgy--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kBiVrv9S--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--lj3tasyI--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--icC2aigW--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--r_NgvEWz--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--iOs9urG0--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-5',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 3076,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--8deYo15Z--/v1561386270/app/stars/paulodybala/bio-background/bio-background-paulodybala-4.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                  media: [
                    {
                      width: 2159,
                      height: 3075,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--TCbBv8lE--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 1080,
                      height: 1538,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--nbhqjDvp--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 540,
                      height: 769,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--vo57bFra--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 270,
                      height: 385,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--fzCG5iOA--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 135,
                      height: 193,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--cEJVT6cE--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 68,
                      height: 97,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--BYN8rYih--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                    {
                      width: 34,
                      height: 49,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XUgnS3v3--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-4',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 2160,
                  height: 2160,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Ycq4OTYZ--/v1561386269/app/stars/paulodybala/bio-background/bio-background-paulodybala-3.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                  media: [
                    {
                      width: 2159,
                      height: 2159,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eKsUIK_6--/c_scale,w_2159/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 1080,
                      height: 1080,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--XVoS3SED--/c_scale,w_1080/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 540,
                      height: 540,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ffE2mMY0--/c_scale,w_540/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 270,
                      height: 270,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--O1sAzewc--/c_scale,w_270/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 135,
                      height: 135,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--UXxukzem--/c_scale,w_135/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 68,
                      height: 68,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4gwVpkKS--/c_scale,w_68/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                    {
                      width: 34,
                      height: 34,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--k8ubPyMc--/c_scale,w_34/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-3',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--zOPbIWsG--/v1561386268/app/stars/paulodybala/bio-background/bio-background-paulodybala-2.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--eQvcSAa9--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--GfAOQfz8--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kNF5AOEN--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--4yzd5fNz--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--Nbm2VxGE--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s---KmtotUO--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--I11FP2s0--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-2',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Artwork',
                  width: 3840,
                  height: 1800,
                  format: 'jpg',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--Sg7f68xZ--/v1561386267/app/stars/paulodybala/bio-background/bio-background-paulodybala-1.jpg',
                  public_id: 'app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                  media: [
                    {
                      width: 3839,
                      height: 1800,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--zxZQqAX7--/c_scale,w_3839/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 1920,
                      height: 900,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--44EUg7Df--/c_scale,w_1920/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 960,
                      height: 450,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--QYrdfya2--/c_scale,w_960/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 480,
                      height: 225,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--kj-2j_Q6--/c_scale,w_480/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 240,
                      height: 113,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--wDB6AbJr--/c_scale,w_240/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 120,
                      height: 57,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--drDPCeB0--/c_scale,w_120/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                    {
                      width: 60,
                      height: 29,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--CH6RxPEp--/c_scale,w_60/v1/app/stars/paulodybala/bio-background/bio-background-paulodybala-1',
                    },
                  ],
                },
                {
                  mediaUsageType: 'Signature',
                  width: 400,
                  height: 400,
                  format: 'png',
                  url:
                    'http://res.cloudinary.com/our-star-club/image/authenticated/s--9qGlnRGo--/v1561386266/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1.png',
                  public_id: 'app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                  media: [
                    {
                      width: 399,
                      height: 399,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--ojTLJ81q--/c_scale,w_399/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 200,
                      height: 200,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--AXfFNkin--/c_scale,w_200/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 100,
                      height: 100,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--KJmHxBjP--/c_scale,w_100/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                    {
                      width: 50,
                      height: 50,
                      url:
                        'https://res.cloudinary.com/our-star-club/image/authenticated/s--xkyIgZ-6--/c_scale,w_50/v1/app/stars/paulodybala/bio-signature/bio-signature-paulodybala-1',
                    },
                  ],
                },
              ],
            },
          ],
          starType: 'Footballer',
          externalId: 'paulodybala',
          bio:
            "I wanted to quit football when I was just 15. I had lost my dad to cancer and it felt like the end of the world. I kept going to make up for all the sacrifices he had made for me, and now every time I score I point to the sky to say thank you. When you're a footballer, people judge you without knowing who you really are. I want to change that.",
          avatar:
            'https://res.cloudinary.com/our-star-club/image/authenticated/s--0d043K3P--/v1/app/stars/paulodybala/avatar/avatar-paulodybala',
          starExternalId: 'paulodybala',
        },
      ],
      description:
        'When OTRO gave members the chance to win a signed shirt from Paulo Dybala, one mum entered the competition in the hope her Dybala-mad son Franek might win the prize of his dreams.',
      descriptionBrief:
        'When OTRO gave members the chance to win a signed shirt from Paulo Dybala, one mum entered the competition in the hope her Dybala-mad son Franek might win the prize of his dreams.',
      title: "Paulo Dybala makes Franek's Day",
      titleBrief: 'Lucky Winner',
      language: 'en',
      tags: [],
      creatives: [
        {
          mediaUsageType: 'Artwork',
          width: 720,
          height: 720,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--5lVB3HYb--/v1565879407/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-4.jpg',
          public_id:
            'app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-4',
          media: [
            {
              width: 719,
              height: 719,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--3l3Imfu3--/c_scale,w_719/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-4',
            },
            {
              width: 360,
              height: 360,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--jLoXI8vF--/c_scale,w_360/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-4',
            },
            {
              width: 180,
              height: 180,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--8-E38YgA--/c_scale,w_180/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-4',
            },
            {
              width: 90,
              height: 90,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--7gD8MmLv--/c_scale,w_90/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-4',
            },
            {
              width: 45,
              height: 45,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--h7SLw-vE--/c_scale,w_45/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-4',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 553,
          height: 720,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--0MKEjYj_--/v1565879407/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-5.jpg',
          public_id:
            'app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-5',
          media: [
            {
              width: 552,
              height: 719,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--9pjzi_HA--/c_scale,w_552/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-5',
            },
            {
              width: 276,
              height: 360,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--N_IH1G6q--/c_scale,w_276/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-5',
            },
            {
              width: 138,
              height: 180,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--AEpejQR9--/c_scale,w_138/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-5',
            },
            {
              width: 69,
              height: 90,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--wYBkmPaI--/c_scale,w_69/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-5',
            },
            {
              width: 35,
              height: 45,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--UH4BkyJA--/c_scale,w_35/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-5',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1220,
          height: 686,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--vAg-b7CH--/v1565879407/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-1.jpg',
          public_id:
            'app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-1',
          media: [
            {
              width: 1219,
              height: 685,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--d90skwqD--/c_scale,w_1219/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-1',
            },
            {
              width: 610,
              height: 343,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--VlJnuneh--/c_scale,w_610/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-1',
            },
            {
              width: 305,
              height: 172,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--kfDuxi6b--/c_scale,w_305/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-1',
            },
            {
              width: 153,
              height: 86,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--jAfiFflc--/c_scale,w_153/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-1',
            },
            {
              width: 77,
              height: 43,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--qL25NE3l--/c_scale,w_77/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-1',
            },
            {
              width: 39,
              height: 22,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--kmvjB2_n--/c_scale,w_39/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-1',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 1410,
          height: 661,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--yeIL2zs1--/v1565879407/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-2.jpg',
          public_id:
            'app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-2',
          media: [
            {
              width: 1409,
              height: 661,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--o2-SIHH_--/c_scale,w_1409/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-2',
            },
            {
              width: 705,
              height: 331,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--Ea8KBqO9--/c_scale,w_705/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-2',
            },
            {
              width: 353,
              height: 166,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--QTR_MeBr--/c_scale,w_353/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-2',
            },
            {
              width: 177,
              height: 83,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--MKQkCJPP--/c_scale,w_177/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-2',
            },
            {
              width: 89,
              height: 42,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--cLoBTs4k--/c_scale,w_89/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-2',
            },
            {
              width: 45,
              height: 21,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--yCfJhFC1--/c_scale,w_45/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-2',
            },
          ],
        },
        {
          mediaUsageType: 'Artwork',
          width: 506,
          height: 720,
          format: 'jpg',
          url:
            'http://res.cloudinary.com/our-star-club/image/authenticated/s--9_9JEcFs--/v1565879407/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-3.jpg',
          public_id:
            'app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-3',
          media: [
            {
              width: 505,
              height: 719,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--IPL8-MaI--/c_scale,w_505/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-3',
            },
            {
              width: 253,
              height: 360,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--m9FYgZdu--/c_scale,w_253/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-3',
            },
            {
              width: 127,
              height: 180,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--iffIHEjT--/c_scale,w_127/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-3',
            },
            {
              width: 64,
              height: 90,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--CTMXJef1--/c_scale,w_64/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-3',
            },
            {
              width: 32,
              height: 45,
              url:
                'https://res.cloudinary.com/our-star-club/image/authenticated/s--KpbV1She--/c_scale,w_32/v1/app/content/dybala-fan-gets-a-prize-to-treasure/dybala-fan-gets-a-prize-to-treasure-3',
            },
          ],
        },
      ],
      contentTypeName: 'Video',
      duration: 161,
    },
  ],
};
// const MoreLikeThis = ({ related = [], className }) => {
const MoreLikeThis = ({ className }) => {
  if (!related.content.length) {
    return null;
  }

  return (
    <CardSection
      className={className}
      title={<FormattedMessage id="moreLikeThis.moreLikeThis" defaultMessage="More like this" />}
      items={related.content.map((item, i) => (
        <Card key={item.externalId} item={item} />
      ))}
    />
  );
};

export default compose()(MoreLikeThis);
// withRequest({
//   requestIdAlias: 'contentId',
//   requestAction: fetchRelatedContentSection,
//   responseSelector: getRelatedContent,
//   responseAlias: 'related',
// })
