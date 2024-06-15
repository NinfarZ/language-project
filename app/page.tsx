import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default async function Home() {
	return (
		<main className="min-h-screen p-4 md:p-24 flex flex-col gap-16 ">
			<section className="flex gap-4">
				<div className="w-1/2 px-8">
					<h1 className="text-8xl font-semibold text-neutral-900 text-balance">
						Learn in context!
						<span className="text-primary text-8xl">.</span>
						<span className="text-primary text-7xl">.</span>
						<span className="text-primary text-6xl">.</span>
					</h1>
				</div>
				<div className="w-1/2 border-dashed border-l border-l-primary px-16  ">
					<div className="max-w-sm mx-auto flex flex-col gap-8 h-full justify-center">
						<Button>Get Strated</Button>
						<Button className="bg-white text-primary hover:bg-primary-foreground border border-primary-foreground shadow-sm shadow-primary">I already have an account</Button>

					</div>
					
						

						
					
				</div>
			</section>
			<section className="flex flex-row-reverse gap-4">
				<div className="w-1/2 px-8">
					<h2 className="text-8xl font-semibold text-neutral-900 text-balance ">
						Master your weak words
						<span className="text-primary text-8xl">.</span>
						<span className="text-primary text-7xl">.</span>
						<span className="text-primary text-6xl">.</span>
					</h2>
				</div>
				<div className="w-1/2 border-dashed px-8">
					<div className="grid grid-rows-2 grid-cols-2 gap-8 text-neutral-900">
						<p className="">
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet,
							modi repudiandae dicta sint error, veritatis commodi, beatae
							repellat laboriosam explicabo incidunt rerum aut labore quis ullam
							delectus nobis a provident.
						</p>

						<p className="">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Perferendis alias, enim culpa vitae dolorem possimus reprehenderit
							sed quis voluptatum corrupti at minus illum vero aspernatur itaque
							quo numquam eveniet voluptatibus?
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}
