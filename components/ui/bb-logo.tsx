import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface BBLogoProps {
  width?: number;
  height?: number;
  fill?: string;
}

const BBLogo: React.FC<BBLogoProps> = ({
  width = 20,
  height = 20,
  fill = '#1E1E1F',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M0.0142875 0.00129132H19.9433C19.9626 0.0206612 19.9703 0.0271178 19.9768 0.0348657C19.9819 0.0426136 19.9884 0.0516529 19.9884 0.0594008C19.9936 0.12655 20 0.193698 20 0.259556C20 6.79881 19.9987 13.3381 19.9961 19.8786C19.9961 19.9057 19.9832 19.9329 19.9781 19.9522C19.9652 19.9651 19.9587 19.9729 19.951 19.978C19.9433 19.9832 19.9342 19.9884 19.9252 19.9884C19.8582 19.9935 19.7911 20 19.724 20C13.1928 20 6.66158 19.9987 0.13034 19.9961C0.103261 19.9961 0.0761813 19.9832 0.0310494 19.9729C0.022023 19.9122 0.00655102 19.8489 0.00268257 19.7856C-0.00247537 19.6991 0.00139183 19.6126 0.00139183 19.5261C0.00139183 13.1689 0.00139183 6.81173 0.00139183 0.454545C0.00139183 0.3125 0.00783948 0.170455 0.0117079 0L0.0142875 0.00129132ZM19.7008 19.7004C19.7047 19.539 19.7099 19.4073 19.7099 19.2743C19.7099 13.0876 19.7099 6.90212 19.7099 0.715393C19.7099 0.637913 19.7137 0.561725 19.7086 0.485537C19.7034 0.422262 19.6867 0.360279 19.6763 0.300878C19.6299 0.291839 19.6016 0.2828 19.5732 0.2828C13.2122 0.281508 6.85113 0.280217 0.491396 0.280217C0.452712 0.280217 0.415317 0.286674 0.376632 0.290548C0.367606 0.290548 0.35858 0.295713 0.350843 0.300878C0.343106 0.306043 0.336658 0.313791 0.30571 0.343492C0.303131 0.451963 0.297974 0.583678 0.297974 0.715393C0.297974 6.90212 0.297974 13.0876 0.297974 19.2743C0.297974 19.3518 0.294104 19.4279 0.299262 19.5041C0.30442 19.5674 0.321185 19.6294 0.33279 19.6991H19.6995L19.7008 19.7004Z"
        fill={fill}
      />
      <Path
        d="M4.35595 16.2461C4.42816 16.21 4.50166 16.1764 4.57129 16.1377C4.79695 16.0111 5.03164 15.9001 5.24182 15.7516C5.54227 15.5411 5.69701 15.2415 5.68798 14.8644C5.68154 14.5764 5.68798 14.2885 5.68798 14.0005C5.68798 10.9956 5.68798 7.9907 5.68798 4.9858C5.68798 4.89024 5.6867 4.79339 5.68798 4.69783C5.68798 4.36467 5.53067 4.12319 5.23537 3.99019C5.03679 3.90108 4.81887 3.8546 4.60869 3.79132C4.53776 3.77066 4.46555 3.75646 4.33016 3.72547C4.47716 3.65057 4.57903 3.66865 4.67316 3.66865C5.75633 3.66736 6.84078 3.66477 7.92395 3.66865C8.71956 3.67123 9.51646 3.66865 10.3108 3.69576C11.06 3.7203 11.8001 3.82102 12.521 4.03926C12.9736 4.17614 13.4043 4.3608 13.7743 4.66167C14.1883 4.99742 14.4358 5.42485 14.4861 5.96204C14.5351 6.49793 14.4113 6.99122 14.1328 7.44706C13.7344 8.10047 13.1554 8.54339 12.4642 8.85072C12.3817 8.88688 12.2992 8.92433 12.1535 8.9889C12.285 9.01989 12.3443 9.03926 12.4062 9.0483C12.9001 9.12578 13.3849 9.23812 13.844 9.44215C14.0193 9.51963 14.1934 9.60227 14.3559 9.703C15.2031 10.226 15.648 10.9866 15.6854 11.9861C15.7279 13.1327 15.3101 14.0857 14.4771 14.8605C13.8233 15.47 13.038 15.8368 12.1831 16.0641C11.5693 16.2268 10.9426 16.312 10.3069 16.312C8.4088 16.312 6.50939 16.312 4.61127 16.312C4.53003 16.312 4.45008 16.3004 4.36884 16.2926C4.36626 16.2771 4.3624 16.2616 4.35982 16.2461H4.35595ZM7.53195 15.6018C7.64413 15.6327 7.7344 15.6637 7.82724 15.6818C8.1754 15.7503 8.52098 15.8277 8.87172 15.8807C9.74728 16.0111 10.628 16.0679 11.5087 15.9543C11.8195 15.9143 12.1315 15.8381 12.4294 15.7373C12.9981 15.5449 13.3836 15.1459 13.6028 14.5881C13.648 14.4719 13.6918 14.3543 13.7189 14.233C13.9239 13.3316 13.9407 12.4225 13.7524 11.5186C13.5371 10.4881 12.9014 9.82438 11.9059 9.50155C11.4752 9.36209 11.0316 9.27557 10.579 9.26782C9.62994 9.25233 8.68088 9.25233 7.73053 9.24845C7.66734 9.24845 7.60545 9.26911 7.53066 9.28203V15.6005L7.53195 15.6018ZM7.55387 8.93208C7.64155 8.93724 7.71763 8.94628 7.79242 8.94628C8.83819 8.94628 9.88397 8.94628 10.9297 8.94628C11.0445 8.94628 11.1606 8.94241 11.2753 8.93208C12.0232 8.86751 12.4758 8.47882 12.6383 7.74664C12.7711 7.14618 12.7479 6.54442 12.5932 5.95041C12.3572 5.04003 11.7808 4.44602 10.8962 4.14902C10.5029 4.0173 10.0954 3.95532 9.68023 3.95403C9.04709 3.95403 8.41395 3.95403 7.78082 3.95403C7.70603 3.95403 7.63124 3.96565 7.56161 3.97082C7.50874 4.20713 7.501 8.61183 7.55516 8.93208H7.55387Z"
        fill={fill}
      />
    </Svg>
  );
};

export default BBLogo;