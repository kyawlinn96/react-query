import { svgIcon } from '@/types';

const InfoIcon = (props: svgIcon) => {
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 18 18'>
      <path
        d='M9.00001 0.639893C4.38001 0.639893 0.640015 4.37989 0.640015 8.99989C0.640015 13.6199 4.38001 17.3599 9.00001 17.3599C13.62 17.3599 17.36 13.6199 17.36 8.99989C17.36 4.37989 13.62 0.639893 9.00001 0.639893ZM9.87001 13.7499C9.64001 13.9799 9.36001 14.0999 9.03001 14.0999C8.70001 14.0999 8.42002 13.9799 8.18002 13.7499C7.94002 13.5199 7.83001 13.2299 7.83001 12.8999C7.83001 12.5699 7.95002 12.2899 8.18002 12.0599C8.41002 11.8299 8.70001 11.7099 9.03001 11.7099C9.36001 11.7099 9.64001 11.8199 9.87001 12.0599C10.1 12.2899 10.22 12.5699 10.22 12.8999C10.22 13.2299 10.1 13.5099 9.87001 13.7499ZM11.67 7.75989C11.47 8.09989 11.17 8.45989 10.77 8.83989C10.46 9.12989 10.24 9.38989 10.13 9.59989C10.01 9.80989 9.96001 10.0799 9.96001 10.3999V10.6199H8.14002V10.1599C8.14002 9.71989 8.23001 9.33989 8.42001 9.00989C8.61001 8.68989 8.94001 8.31989 9.41001 7.90989C9.69001 7.65989 9.89001 7.43989 10.01 7.25989C10.13 7.07989 10.2 6.85989 10.2 6.62989C10.2 6.33989 10.09 6.09989 9.88001 5.90989C9.67001 5.70989 9.39001 5.60989 9.04001 5.60989C8.67001 5.60989 8.37002 5.71989 8.14002 5.92989C7.91002 6.14989 7.74001 6.41989 7.64001 6.73989L6.05001 6.07989C6.22001 5.48989 6.57001 4.97989 7.08001 4.54989C7.59001 4.11989 8.23001 3.90989 9.01001 3.90989C9.59001 3.90989 10.11 4.02989 10.56 4.25989C11.01 4.48989 11.36 4.80989 11.62 5.20989C11.88 5.60989 12 6.05989 12 6.53989C12 7.01989 11.9 7.42989 11.7 7.76989L11.67 7.75989Z'
        fill={props.fill_one}
      />
    </svg>
  );
};

export default InfoIcon;