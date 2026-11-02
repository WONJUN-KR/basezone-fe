import { ICONS, type IconName } from "./icons";

type Props = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

// 장식용 아이콘 (화면 읽기 프로그램은 건너뜀). 뜻이 있는 아이콘은 옆에 글자나 aria-label 을 둘 것
export default function Icon({
  name,
  size = 24,
  strokeWidth,
  className,
}: Props) {
  const body = strokeWidth
    ? ICONS[name].replaceAll(
        'stroke-width="1.5"',
        `stroke-width="${strokeWidth}"`,
      )
    : ICONS[name];
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}
