import Link, { LinkProps } from './CustomLink';

interface Props extends Omit<LinkProps, 'className'> {}

export default function DescLink({ ...props }: Props) {
	return (
		<Link
			className="font-mono text-cyan-600 hover:bg-cyan-200 hover:text-black transition"
			{...props}
		/>
	);
}
