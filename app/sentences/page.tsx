import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TextareaWithButton } from "@/components/textareaWithButton";
import { Suspense } from "react";
import { SentenceCard } from "@/components/SentenceCard";
import { SentenceDeck } from "@/components/SentenceDeck.";

export default async function Home() {
	return (
		<main className="min-h-screen p-4 md:p-24 ">
			<h1 className="text-black"></h1>
			<section className="flex items-center justify-center">
				<div className="mt-24">
					<SentenceCard />
					
				</div>

				{/* <div className="flex-1">
					<TextareaWithButton />
				</div> */}
			</section>
		</main>
	);
}


