import React from 'react';

export default ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <mask id="path-2-inside-1" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.99995 1H15V3.5121C15.301 3.61852 15.5948 3.74051 15.8802 3.8771L17.657 2.10028L21.8996 6.34292L20.1228 8.11972C20.2594 8.40515 20.3814 8.6989 20.4879 9.00001H23V15L20.4878 15C20.3814 15.3011 20.2594 15.5949 20.1228 15.8803L21.8994 17.6569L17.6567 21.8995L15.8801 20.1229C15.5947 20.2595 15.301 20.3815 15 20.4879V23H8.99995V20.4879C8.69884 20.3814 8.40509 20.2594 8.11965 20.1228L6.34321 21.8993L2.10057 17.6567L3.87705 15.8802C3.74048 15.5948 3.6185 15.3011 3.51209 15L1 15L1 9.00001H3.51208C3.61849 8.69894 3.74047 8.40522 3.87705 8.11983L2.10036 6.34314L6.343 2.1005L8.11965 3.87714C8.40508 3.74054 8.69884 3.61855 8.99995 3.51212V1Z"
      />
    </mask>
    <path
      d="M15 1H17V-1H15V1ZM8.99995 1V-1H6.99995V1H8.99995ZM15 3.5121H13V4.92646L14.3335 5.39779L15 3.5121ZM15.8802 3.8771L15.0169 5.68116L16.2936 6.29214L17.2944 5.29131L15.8802 3.8771ZM17.657 2.10028L19.0712 0.686068L17.657 -0.728146L16.2428 0.686067L17.657 2.10028ZM21.8996 6.34292L23.3139 7.75714L24.7281 6.34292L23.3139 4.92871L21.8996 6.34292ZM20.1228 8.11972L18.7086 6.70551L17.7078 7.70634L18.3188 8.98307L20.1228 8.11972ZM20.4879 9.00001L18.6022 9.6665L19.0735 11H20.4879V9.00001ZM23 9.00001H25V7.00001H23V9.00001ZM23 15V17H25V15H23ZM20.4878 15L20.4878 13L19.0735 13L18.6022 14.3335L20.4878 15ZM20.1228 15.8803L18.3188 15.017L17.7078 16.2937L18.7086 17.2945L20.1228 15.8803ZM21.8994 17.6569L23.3136 19.0711L24.7278 17.6569L23.3136 16.2427L21.8994 17.6569ZM17.6567 21.8995L16.2425 23.3137L17.6567 24.7279L19.0709 23.3137L17.6567 21.8995ZM15.8801 20.1229L17.2944 18.7087L16.2935 17.7079L15.0168 18.3188L15.8801 20.1229ZM15 20.4879L14.3335 18.6022L13 19.0735V20.4879H15ZM15 23V25H17V23H15ZM8.99995 23H6.99995V25H8.99995V23ZM8.99995 20.4879H11V19.0735L9.66645 18.6022L8.99995 20.4879ZM8.11965 20.1228L8.98301 18.3188L7.70628 17.7078L6.70544 18.7086L8.11965 20.1228ZM6.34321 21.8993L4.92899 23.3135L6.34321 24.7277L7.75742 23.3135L6.34321 21.8993ZM2.10057 17.6567L0.686354 16.2424L-0.72786 17.6567L0.686353 19.0709L2.10057 17.6567ZM3.87705 15.8802L5.29126 17.2944L6.29209 16.2936L5.68112 15.0168L3.87705 15.8802ZM3.51209 15L5.39777 14.3335L4.92644 13L3.51209 13L3.51209 15ZM1 15H-1V17H0.999999L1 15ZM1 9.00001V7.00001H-1L-1 9.00001H1ZM3.51208 9.00001V11H4.92644L5.39776 9.6665L3.51208 9.00001ZM3.87705 8.11983L5.68112 8.98315L6.29208 7.70643L5.29126 6.70561L3.87705 8.11983ZM2.10036 6.34314L0.686144 4.92892L-0.72807 6.34314L0.686143 7.75735L2.10036 6.34314ZM6.343 2.1005L7.75721 0.686283L6.343 -0.727931L4.92879 0.686283L6.343 2.1005ZM8.11965 3.87714L6.70543 5.29136L7.70627 6.2922L8.98301 5.6812L8.11965 3.87714ZM8.99995 3.51212L9.66645 5.3978L11 4.92647V3.51212H8.99995ZM15 -1H8.99995V3H15V-1ZM17 3.5121V1H13V3.5121H17ZM16.7435 2.07303C16.3944 1.90595 16.035 1.75668 15.6664 1.62642L14.3335 5.39779C14.5671 5.48037 14.7952 5.57507 15.0169 5.68116L16.7435 2.07303ZM17.2944 5.29131L19.0712 3.5145L16.2428 0.686067L14.466 2.46288L17.2944 5.29131ZM16.2428 3.51449L20.4854 7.75714L23.3139 4.92871L19.0712 0.686068L16.2428 3.51449ZM20.4854 4.92871L18.7086 6.70551L21.5371 9.53394L23.3139 7.75714L20.4854 4.92871ZM22.3735 8.33352C22.2433 7.96497 22.094 7.60553 21.9269 7.25638L18.3188 8.98307C18.4249 9.20478 18.5196 9.43284 18.6022 9.6665L22.3735 8.33352ZM23 7.00001H20.4879V11H23V7.00001ZM25 15V9.00001H21V15H25ZM20.4878 17L23 17L23 13L20.4878 13L20.4878 17ZM21.9269 16.7437C22.094 16.3945 22.2433 16.0351 22.3735 15.6665L18.6022 14.3335C18.5196 14.5672 18.4249 14.7952 18.3188 15.017L21.9269 16.7437ZM23.3136 16.2427L21.537 14.4661L18.7086 17.2945L20.4852 19.0711L23.3136 16.2427ZM19.0709 23.3137L23.3136 19.0711L20.4852 16.2427L16.2425 20.4853L19.0709 23.3137ZM14.4659 21.5371L16.2425 23.3137L19.0709 20.4853L17.2944 18.7087L14.4659 21.5371ZM15.6664 22.3736C16.0349 22.2433 16.3943 22.0941 16.7435 21.927L15.0168 18.3188C14.7951 18.4249 14.5671 18.5196 14.3335 18.6022L15.6664 22.3736ZM17 23V20.4879H13V23H17ZM8.99995 25H15V21H8.99995V25ZM6.99995 20.4879V23H11V20.4879H6.99995ZM7.2563 21.9269C7.60545 22.094 7.96491 22.2433 8.33345 22.3735L9.66645 18.6022C9.43278 18.5196 9.20472 18.4249 8.98301 18.3188L7.2563 21.9269ZM7.75742 23.3135L9.53387 21.5371L6.70544 18.7086L4.92899 20.4851L7.75742 23.3135ZM0.686353 19.0709L4.92899 23.3135L7.75742 20.4851L3.51478 16.2424L0.686353 19.0709ZM2.46284 14.466L0.686354 16.2424L3.51478 19.0709L5.29126 17.2944L2.46284 14.466ZM1.62641 15.6665C1.75666 16.035 1.90592 16.3944 2.07298 16.7435L5.68112 15.0168C5.57504 14.7952 5.48035 14.5671 5.39777 14.3335L1.62641 15.6665ZM0.999999 17L3.51209 17L3.51209 13L1 13L0.999999 17ZM-1 9.00001L-1 15H3L3 9.00001H-1ZM3.51208 7.00001H1V11H3.51208V7.00001ZM2.07298 7.2565C1.90591 7.60561 1.75665 7.96502 1.6264 8.33352L5.39776 9.6665C5.48034 9.43286 5.57503 9.20483 5.68112 8.98315L2.07298 7.2565ZM0.686143 7.75735L2.46283 9.53404L5.29126 6.70561L3.51457 4.92892L0.686143 7.75735ZM4.92879 0.686283L0.686144 4.92892L3.51457 7.75735L7.75721 3.51471L4.92879 0.686283ZM9.53386 2.46293L7.75721 0.686283L4.92878 3.51471L6.70543 5.29136L9.53386 2.46293ZM8.33346 1.62644C7.9649 1.75671 7.60545 1.90599 7.25629 2.07309L8.98301 5.6812C9.20472 5.57509 9.43278 5.48039 9.66645 5.3978L8.33346 1.62644ZM6.99995 1V3.51212H11V1H6.99995Z"
      fill="currentColor"
      mask="url(#path-2-inside-1)"
    />
  </svg>
);
