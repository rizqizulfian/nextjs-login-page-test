import * as Lucide from "lucide-react";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "#/app/link";

export const metadata: Metadata = { title: "Dashboard | Zero One Group" };

const navItems = [
	{ name: "Dashboard", href: "/" },
	{ name: "Sign In", href: "/login" },
];

type Card = {
	title: string;
	description: string;
	href: string;
	Icon: LucideIcon;
};

const cards: Card[] = [
	{
		title: "Zero One Starter Kit",
		description:
			"Launch your next project in minutes with our battle-tested monorepo template and development tools.",
		href: "https://github.com/zero-one-group/monorepo",
		Icon: Lucide.Rocket,
	},
	{
		title: "Master Next.js",
		description:
			"Build a full-stack app with Next.js, TypeScript, Tailwind CSS, and more.",
		href: "https://nextjs.org/docs",
		Icon: Lucide.BookOpen,
	},
	{
		title: "Star Our Repository",
		description:
			"Support our work by starring our GitHub repository and stay updated with latest features.",
		href: "https://github.com/zero-one-group/monorepo",
		Icon: Lucide.Star,
	},
];

export default function Page() {
	return (
		<div className="min-h-screen bg-gray-50">
			<nav className="bg-white shadow-sm">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<Image
							src="/zog-logo.svg"
							alt="Zero One Group"
							width={120}
							height={40}
							priority
						/>
						<div className="flex items-center gap-6">
							{navItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className="text-sm font-medium text-gray-600 hover:text-gray-900"
								>
									{item.name}
								</Link>
							))}
						</div>
					</div>
				</div>
			</nav>

			<div className="bg-[#1a7a7a] py-16 text-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<h1 className="text-4xl font-bold">Welcome to Zero One Group</h1>
					<p className="mt-3 text-white/80">
						Your Trusted Digital Transformation Partner
					</p>
				</div>
			</div>

			<main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{cards.map(({ title, description, href, Icon }) => (
						<div
							key={title}
							className="rounded-xl bg-white p-6 shadow-sm border border-gray-100"
						>
							<div className="mb-4">
								<Icon className="size-6 text-[#1a7a7a]" />
							</div>
							<h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
							<p className="mt-2 text-sm text-gray-500">{description}</p>
							<Link
								href={href}
								className="mt-4 inline-flex items-center text-sm text-[#1a7a7a] font-medium hover:underline"
								newTab
							>
								<span>Learn more</span>
								<Lucide.ChevronsRight className="ml-1 size-4" />
							</Link>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
