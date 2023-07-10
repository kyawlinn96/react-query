type myIconProps = {
  width: number;
  height: number;
  fill: string;
};
const DownChveronIcon = (props: myIconProps) => {
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 10 10'>
      <path
        d='M4.99998 7.61982C4.74998 7.61982 4.48998 7.51982 4.29998 7.32982L0.629976 3.65982C0.339976 3.36982 0.339976 2.88982 0.629976 2.59982C0.919976 2.30982 1.39998 2.30982 1.68998 2.59982L4.99998 5.90982L8.30998 2.59982C8.59998 2.30982 9.07998 2.30982 9.36998 2.59982C9.65998 2.88982 9.65998 3.36982 9.36998 3.65982L5.69998 7.32982C5.50998 7.51982 5.24998 7.61982 4.99998 7.61982V7.61982Z'
        fill={props.fill}
      />
    </svg>
  );
};

export default DownChveronIcon;
