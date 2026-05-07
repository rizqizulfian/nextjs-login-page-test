import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "./form";

export const metadata: Metadata = { title: "Login | Zero One Group" };

export default function Page() {
	return (
		<div className="flex min-h-screen">
			{/* Left Panel - Hero (60% width) */}
			<div className="hidden lg:flex lg:w-3/5 flex-col justify-between bg-[#1a7a7a] p-16 text-white">
				{/* Branding - centered vertically */}
				<div className="flex flex-1 items-center justify-center">
					<h1 className="text-center text-5xl font-bold leading-tight">
						Your{" "}
						<span className="italic font-extrabold">Trusted</span>{" "}
						Digital
						<br />
						<span className="font-extrabold">Transformation Partner</span>
					</h1>
				</div>

				{/* Testimonial - centered horizontally */}
				<div className="flex flex-col items-center gap-4 text-center">
					<p className="max-w-md text-base italic leading-relaxed text-white/80">
						&quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt.&quot;
					</p>
					<div className="flex flex-col items-center gap-2">
						<div className="h-10 w-10 rounded-full bg-white/40" />
						<p className="text-sm font-medium text-white/90">
							John Doe, VP of A Great Company
						</p>
					</div>
				</div>
			</div>

			{/* Right Panel - Form (40% width) */}
			<div className="flex w-full lg:w-2/5 flex-col justify-between bg-white px-8 py-10 sm:px-12 md:px-16">
				{/* Logo */}
				<div>
					<Image
						src="/zog-logo.svg"
						alt="Zero One Group"
						width={120}
						height={40}
						priority
					/>
				</div>

				{/* Form Section */}
				<div className="mx-auto w-full max-w-md space-y-8 py-8">
					<div className="space-y-1">
						<h2 className="text-2xl font-bold text-gray-900">
							Login to your Account
						</h2>
						<p className="text-sm text-gray-500">
							See what is going on with your business
						</p>
					</div>

					<LoginForm />
				</div>

				{/* Footer */}
				<p className="text-center text-sm text-gray-500">
					Not Registered Yet?{" "}
					<a href="#" className="font-semibold text-[#1a7a7a] hover:underline">
						Create an account
					</a>
				</p>
			</div>
		</div>
	);
}
