import type { SVGProps } from 'react';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faBars, faChevronDown, faChevronUp, faCircleNotch, faMagnifyingGlass, faXmark, type IconDefinition } from '@fortawesome/free-solid-svg-icons';

type IconProps = SVGProps<SVGSVGElement>;

// Font Awesome Free by Fonticons, Inc. — CC BY 4.0.
// https://fontawesome.com/license/free — full notice in public/fontawesome-license.txt.
function Glyph({ icon, rotation, ...props }: IconProps & { icon: IconDefinition; rotation?: number }) {
  const [width, height, , , paths] = icon.icon;
  const pathData = Array.isArray(paths) ? paths : [paths];
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} fill="currentColor" focusable="false" aria-hidden="true" data-prefix={icon.prefix} data-icon={icon.iconName} {...props}>
    <g transform={rotation ? `rotate(${rotation} ${width / 2} ${height / 2})` : undefined}>{pathData.map((path, index) => <path key={index} d={path} />)}</g>
  </svg>;
}

export function ArrowUpRight(props: IconProps) { return <Glyph icon={faArrowRight} rotation={-45} {...props} />; }
export function Envelope(props: IconProps) { return <Glyph icon={faEnvelope} {...props} />; }
export function Menu(props: IconProps) { return <Glyph icon={faBars} {...props} />; }
export function Close(props: IconProps) { return <Glyph icon={faXmark} {...props} />; }
export function ChevronDown(props: IconProps) { return <Glyph icon={faChevronDown} {...props} />; }
export function ChevronUp(props: IconProps) { return <Glyph icon={faChevronUp} {...props} />; }
export function Search(props: IconProps) { return <Glyph icon={faMagnifyingGlass} {...props} />; }
export function Loading(props: IconProps) { return <Glyph icon={faCircleNotch} {...props} />; }
