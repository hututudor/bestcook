const ActivityIndicator: React.FC<VariantProps &
  ActivityIndicatorSpecificProps>;

const Anchor: React.FC<BorderProps &
  ColorProps &
  FlexProps &
  LayoutProps &
  PositionProps &
  ShadowProps &
  SpaceProps &
  TypographyProps &
  VariantProps &
  AnchorSpecificProps>;

const Button: React.FC<BorderProps &
  ButtonStyleProps &
  ColorProps &
  ColorStyleProps &
  FlexProps &
  LayoutProps &
  PositionProps &
  ShadowProps &
  SpaceProps &
  TypographyProps &
  VariantProps &
  ButtonSpecificProps>;

const Card: React.FC<BorderProps &
  ColorProps &
  ColorStyleProps &
  FlexProps &
  LayoutProps &
  PositionProps &
  ShadowProps &
  SpaceProps &
  TypographyProps &
  VariantProps &
  CardSpecificProps>;

const Checkbox: React.FC<ColorProps &
  TypographyProps &
  VariantProps &
  CheckboxSpecificProps>;

const Chip: React.FC<ChipSpecificProps>;

const Checkbox: React.FC<CollapsibleSpecificProps>;

const Dropdown: React.FC<VariantProps & DropdownSpecificProps> & {
  Option: React.FC<VariantProps & OptionSpecificProps>;
};

const List: React.FC<VariantProps & ListSpecificProps>;

const Icon: React.FC<BorderProps &
  ColorProps &
  LayoutProps &
  PositionProps &
  SpaceProps &
  TypographyProps &
  IconSpecificProps>;

const IconButton: React.FC<IconButtonSpecificProps>;

const Image: React.FC<BorderProps &
  LayoutProps &
  PositionProps &
  SpaceProps &
  ImageSpecificProps>;

const Input: React.FC<BorderProps &
  ColorProps &
  FlexProps &
  LayoutProps &
  PositionProps &
  ShadowProps &
  TypographyProps &
  InputSpecificProps &
  VariantProps>;

const MenuList: React.FC<MenuListSpecificProps> & {
  Item: React.FC<ListItemSpecificProps>;
};

const Modal: React.FC<ModalSpecificProps>;

const Box: React.FC<BackgroundProps &
  BorderProps &
  ShadowProps &
  ColorProps &
  ColorStyleProps &
  LayoutProps &
  PositionProps &
  SpaceProps &
  TypographyProps>;

const Flex: React.FC<FlexProps & LayoutProps>;

const Hide: React.FC<HideSpecificProps>;

const Space: React.FC<SpaceSpecificProps>;

const Skeleton: React.FC<SkeletonSpecificProps>;

const Tooltip: React.FC<BorderProps &
  ColorProps &
  LayoutProps &
  PositionProps &
  SpaceSpecificProps &
  ShadowProps &
  TooltipSpecificProps &
  VariantProps>;

const TopBar: React.FC<BorderProps &
  ColorProps &
  ColorStyleProps &
  FlexProps &
  LayoutProps &
  PositionProps &
  ShadowProps &
  SpaceProps &
  TypographyProps &
  VariantProps>;

const Touchable: React.FC<BorderProps &
  ColorProps &
  FlexProps &
  LayoutProps &
  PositionProps &
  SpaceProps &
  TypographyProps &
  TouchableSpecificProps>;

const Typography: React.FC<ColorProps &
  LayoutProps &
  SpaceProps &
  TextStyleProps &
  TypographyProps &
  VariantProps &
  AsProps &
  TypographySpecificProps>;

declare module '@ivoryio/kogaio' {
  export {
    Anchor,
    Button,
    Card,
    Checkbox,
    Chip,
    Checkbox,
    Dropdown,
    List,
    Icon,
    IconButton,
    Image,
    Input,
    MenuList,
    Modal,
    Box,
    Flex,
    Hide,
    Space,
    Skeleton,
    Tooltip,
    TopBar,
    Touchable,
    Typography
  };
}

declare module '@ivoryio/kogaio/Anchor' {
  export default Anchor;
}

declare module '@ivoryio/kogaio/Button' {
  export default Button;
}

declare module '@ivoryio/kogaio/Card' {
  export default Card;
}

declare module '@ivoryio/kogaio/Checkbox' {
  export default Checkbox;
}

declare module '@ivoryio/kogaio/Chip' {
  export default Chip;
}

declare module '@ivoryio/kogaio/Checkbox' {
  export default Checkbox;
}

declare module '@ivoryio/kogaio/Dropdown' {
  export default Dropdown;
}

declare module '@ivoryio/kogaio/List' {
  export default List;
}

declare module '@ivoryio/kogaio/Icon' {
  export default Icon;
}

declare module '@ivoryio/kogaio/IconButton' {
  export default IconButton;
}

declare module '@ivoryio/kogaio/Image' {
  export default Image;
}

declare module '@ivoryio/kogaio/Input' {
  export default Input;
}

declare module '@ivoryio/kogaio/MenuList' {
  export default MenuList;
}

declare module '@ivoryio/kogaio/Modal' {
  export default Modal;
}

declare module '@ivoryio/kogaio/Responsive' {
  export { Box, Flex, Hide, Space };
}

declare module '@ivoryio/kogaio/Responsive/Box' {
  export default Box;
}

declare module '@ivoryio/kogaio/Responsive/Flex' {
  export default Flex;
}

declare module '@ivoryio/kogaio/Responsive/Hide' {
  export default Hide;
}

declare module '@ivoryio/kogaio/Responsive/Space' {
  export default Space;
}

declare module '@ivoryio/kogaio/Skeleton' {
  export default Skeleton;
}

declare module '@ivoryio/kogaio/Tooltip' {
  export default Tooltip;
}

declare module '@ivoryio/kogaio/TopBar' {
  export default TopBar;
}

declare module '@ivoryio/kogaio/Touchable' {
  export default Touchable;
}

declare module '@ivoryio/kogaio/Typography' {
  export default Typography;
}

declare module '@ivoryio/kogaio/utils' {
  function themeGet(path: string, fallback: any = null): string;
  function themed(key: string): any;
  function randomiser(): string;

  function ConditionalWrap({
    condition,
    wrap,
    children
  }: {
    condition: boolean;
    wrap: Function;
    children: any;
  }): any;

  const isMobileDevice: boolean;

  function useBoolean(
    initialState: boolean
  ): [boolean, (val: boolean) => void, () => void];

  function usePrevious(value: any): any;

  function hexToRgbA(hex: string, alpha: string): string;
  function buildTheme(obj: any): any;
}

interface ActivityIndicatorSpecificProps {
  colors?: {
    background: string;
    primary: string;
  };
}

interface AnchorSpecificProps {
  href: string;
  target?: string;
  rel?: string;
}

interface ButtonSpecificProps {
  CustomLoading?: React.FC;
  disabled?: boolean;
  icon?: {
    name?: string;
    size: string | number;
  };
  loading?: boolean;
  onClick?: () => void;
  spinnerSize?: string | number;
  title?: string;
  type?: string;
}

interface CardSpecificProps {
  cardStyle?: string;
}

interface CheckboxSpecificProps {
  checkboxPosition?: 'left' | 'right';
  checked: boolean;
  color?: string;
  disabled?: string;
  error?: boolean | string;
  id: string | number;
  label?: any;
  labelColor?: string;
  name?: string;
  onChange: Function;
  size?: string | number;
  valid?: boolean | string;
  value?: string | number;
}

interface ChipSpecificProps {
  Avatar?: React.FC;
  color?: string;
  DismissIcon?: React.FC;
  Icon?: React.FC;
  isRounded?: boolean;
  label?: string;
  onClick?: () => void;
  onDismiss?: () => void;
  touchEffect?: Effect;
}

interface CollapsibleSpecificProps {
  animated?: boolean;
  animationDuration?: number;
  color?: string;
  fontsize?: string | number;
  icon?: {
    name: string;
    color: string;
    size: string | number;
  };
  initialExpanded?: boolean;
  title?: string;
  Trigger?: Function;
  triggerEffect?: Effect;
  underlayColor?: string;
}

interface DropdownSpecificProps {
  autoFocus?: boolean;
  containerStyle?: object;
  disabled?: boolean;
  error?: string | boolean;
  id?: string | number;
  label?: string;
  multiple?: boolean;
  noBottomSpace?: boolean;
  onChange: Function;
  placeholder?: string;
  readOnly?: boolean;
  renderListFooter?: Function;
  renderListHeader?: Function;
  required?: boolean;
  size?: number;
  valid?: string | boolean;
  value: object | string;
}

interface ListSpecificProps {
  className?: string;
  dummySpace?: number;
  handleSelect: Function;
  isListOpen: boolean;
  multiple?: boolean;
  renderListFooter?: Function;
  renderListHeader?: Function;
  setListOpen?: Function;
  size?: number;
  value?: string;
}

interface OptionSpecificProps {
  color?: string;
  fontSize?: string | number | Array;
  isSelected?: boolean;
  label?: string;
  selectedColor?: string;
  selectOption?: Function;
  shouldShow?: boolean;
}

interface IconSpecificProps {
  onClick?: () => void;
  pointerEvents?: string;
  src?: string;
  tabIndex?: string;
}

interface IconButtonSpecificProps {
  alignItems?: string;
  as?: string;
  bottom?: number | string;
  color?: string;
  disabled?: bool;
  display?: string;
  effect?: Effect;
  height?: number | string;
  justifyContent?: string;
  fontSize?: string;
  number;
  left?: number | string;
  name?: string;
  onClick?: () => void;
  onDrag?: Function;
  onMouseDown?: Function;
  onMouseUp?: Function;
  onTouchStart?: Function;
  onTouchEnd?: Function;
  pointerEvents?: string;
  position?: string;
  right?: number | string;
  tabIndex?: string;
  title?: string;
  top?: number | string;
  underlayColor?: string;
  width?: string | number | object;
}

interface ImageSpecificProps {
  alt: string;
  objectFit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  src?: string;
  srcSet?: string;
}

interface InputSpecificProps {
  autoComplete?: string;
  autoFocus?: boolean;
  className?: string;
  containerStyle?: object;
  disabled?: boolean;
  error?: bool | string;
  icLeft?: string;
  id: string | number;
  label?: string;
  name?: string;
  noBottomSpace?: boolean;
  onChange?: Function;
  passwordView?: 'peek' | 'toggle';
  placeholder?: string;
  placeholderTextColor?: string;
  readOnly?: boolean;
  required?: boolean;
  type: string;
  valid?: string | boolean;
  value?: string | number | object;
}

interface MenuListSpecificProps {
  alignment?: Alignment;
  arrowSize?: number;
  disabled?: boolean;
  icon?: {
    color?: string;
    name?: string;
    size?: string | number;
  };
  id: string | number;
  isInitialOpen?: boolean;
  listStyle?: object;
  ref?: object;
  textAlign?: Alignment;
  Trigger?: Function | object | React.FC;
}

interface ListItemSpecificProps {
  alignment?: Alignment;
  color?: string;
  disabled?: boolean;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  id?: string;
  label?: string;
  icon?: {
    color?: string;
    name?: string;
    size?: string;
  };
  Icon?: React.FC;
  onClick?: () => void;
  showMenu?: Function;
  style?: object;
  textAlign?: Alignment;
  textVariant?: string;
  value?: string | object;
}

interface ModalSpecificProps {
  animated?: boolean;
  bg?: string;
  colors?: string;
  id?: string | number;
  onBackdropClick?: Function;
  overlayStyle?: object;
  position?: string;
  ref?: object;
  withPortal?: boolean;
  visible?: boolean;
}

interface HideSpecificProps {
  rule?: 'display' | 'visibility';
  md?: boolean;
  lg?: boolean;
  sm?: boolean;
  xlg?: boolean;
  xs?: boolean;
}

interface SpaceSpecificProps {
  className?: string;
}

interface SkeletonSpecificProps {
  bg?: string;
  className?: string;
  count?: number;
  duration?: number;
  height?: string | number;
  highlight?: string;
  round?: boolean;
  width?: string | number;
  Wrapper?: Function;
}

interface TooltipSpecificProps {
  arrow: {
    alignment?: 'top' | 'right' | 'bottom' | 'left' | 'center';
    direction?: 'top' | 'right' | 'bottom' | 'left';
    size?: number;
  };
  dismissable?: boolean;
  fontSize?: string | number | object;
  icLeft?: string;
  visible: boolean;
}

interface TouchableSpecificProps {
  activeOpacity?: string | number;
  as?: string;
  disabled?: boolean;
  effect: Effect;
  onClick?: () => void;
  onDrag?: Function;
  onMouseDown?: Function;
  onMouseUp?: Function;
  onTouchStart?: Function;
  onTouchEnd?: Function;
  tabIndex?: string;
  type?: string;
  underlayColor?: string;
}

interface TypographySpecificProps {
  truncate?: boolean;
}

interface SpaceProps {
  margin?: string | number | object;
  m?: string | number | object;
  marginTop?: string | number | object;
  mt?: string | number | object;
  marginRight?: string | number | object;
  mr?: string | number | object;
  marginBottom?: string | number | object;
  mb?: string | number | object;
  marginLeft?: string | number | object;
  ml?: string | number | object;
  marginX?: string | number | object;
  mx?: string | number | object;
  marginY?: string | number | object;
  my?: string | number | object;
  padding?: string | number | object;
  p?: string | number | object;
  paddingTop?: string | number | object;
  pt?: string | number | object;
  paddingRight?: string | number | object;
  pr?: string | number | object;
  paddingBottom?: string | number | object;
  pb?: string | number | object;
  paddingLeft?: string | number | object;
  pl?: string | number | object;
  paddingX?: string | number | object;
  px?: string | number | object;
  paddingY?: string | number | object;
  py?: string | number | object;
}

interface ColorProps {
  color?: string | object;
  bg?: string | object;
  backgroundColor?: string | object;
}

interface TypographyProps {
  fontSize?: string | number | object;
  fontFamily?: string | number | object;
  textAlign?: string | number | object;
  lineHeight?: string | number | object;
  fontWeight?: string | number | object;
  letterSpacing?: string | number | object;
}

interface LayoutProps {
  width?: string | number | object;
  height?: string | number | object;
  display?: string | number | object;
  minWidth?: string | number | object;
  minHeight?: string | number | object;
  maxWidth?: string | number | object;
  maxHeight?: string | number | object;
  size?: string | number | object;
  verticalAlign?: string | number | object;
  overflow?: string | number | object;
  overflowX?: string | number | object;
  overflowY?: string | number | object;
}

interface FlexProps {
  alignItems?: string | object;
  alignContent?: string | object;
  justifyItems?: string | object;
  justifyContent?: string | object;
  flexWrap?: string | object;
  flexDirection?: string | object;
  flex?: string | object;
  flexGrow?: string | object;
  flexShrink?: string | object;
  flexBasis?: string | object;
  justifySelf?: string | object;
  alignSelf?: string | object;
  order?: string | object;
}

interface GridProps {
  gridGap?: string | number | object;
  gridColumnGap?: string | number | object;
  gridRowGap?: string | number | object;
  gridColumn?: string | number | object;
  gridRow?: string | number | object;
  gridAutoFlow?: string | number | object;
  gridAutoColumns?: string | number | object;
  gridAutoRows?: string | number | object;
  gridTemplateColumns?: string | number | object;
  gridTemplateRows?: string | number | object;
  gridTemplateAreas?: string | number | object;
  gridArea?: string | number | object;
}

interface BackgroundProps {
  backgroundImage?: string | object;
  backgroundSize?: string | object;
  backgroundPosition?: string | object;
  backgroundRepeat?: string | object;
}

interface BorderProps {
  border?: string | number | object;
  borderWidth?: string | number | object;
  borderStyle?: string | number | object;
  borderColor?: string | number | object;
  borderRadius?: string | number | object;
  borderTop?: string | number | object;
  borderTopWidth?: string | number | object;
  borderTopStyle?: string | number | object;
  borderTopColor?: string | number | object;
  borderTopLeftRadius?: string | number | object;
  borderTopRightRadius?: string | number | object;
  borderRight?: string | number | object;
  borderRightWidth?: string | number | object;
  borderRightStyle?: string | number | object;
  borderRightColor?: string | number | object;
  borderBottom?: string | number | object;
  borderBottomWidth?: string | number | object;
  borderBottomStyle?: string | number | object;
  borderBottomColor?: string | number | object;
  borderBottomLeftRadius?: string | number | object;
  borderBottomRightRadius?: string | number | object;
  borderLeft?: string | number | object;
  borderLeftWidth?: string | number | object;
  borderLeftStyle?: string | number | object;
  borderLeftColor?: string | number | object;
  borderX?: string | number | object;
  borderY?: string | number | object;
}

interface PositionProps {
  position?: string | number | object;
  zIndex?: string | number | object;
  top?: string | number | object;
  right?: string | number | object;
  bottom?: string | number | object;
  left?: string | number | object;
}

interface ShadowProps {
  textShadow?: string | number | object;
  boxShadow?: string | number | object;
}

interface TextStyleProps {
  textStyle?: string;
}

interface ColorStyleProps {
  colorStyle?: string;
}

interface ButtonStyleProps {
  buttonStyle?: string;
}

interface VariantProps {
  variant?: string;
}

interface AsProps {
  as?: string;
}

type Effect = 'opacity' | 'highlight' | 'no-feedback';
type Alignment = 'left' | 'center' | 'right';
