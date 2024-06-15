import { cn } from "@/lib/utils";

const TickIcon = ({stroke}) => {
	return (
		<svg
        className={cn(stroke)}
			
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title />

			<g id="Complete">
				<g id="tick">
					<polyline
						fill="none"
						points="3.7 14.3 9.6 19 20.3 5"
						
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
					/>
				</g>
			</g>
		</svg>
	);
};

export { TickIcon };
