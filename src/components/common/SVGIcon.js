import React from 'react';
import {icons} from '../../assets/Icons/index';

const SvgIcon = ({name, width = 20, height = 20, color = '#000', style}) => {
  const Icon = icons[name];

  if (!Icon) {
    console.warn(`SVG icon "${name}" not found`);
    return null;
  }

  return <Icon width={width} height={height} fill={color} style={style} />;
};

export default SvgIcon;
