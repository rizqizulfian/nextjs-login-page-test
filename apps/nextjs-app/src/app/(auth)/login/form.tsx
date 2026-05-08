"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Lucide from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
	rememberMe: z.boolean().optional(),
});

type LoginValues = {
	email: string;
	password: string;
	rememberMe?: boolean | undefined;
};

export function LoginForm() {
	const router = useRouter();
	const [serverError, setServerError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginValues>({
		resolver: zodResolver(loginSchema as z.ZodType<LoginValues>),
		defaultValues: { email: "", password: "", rememberMe: false },
	});

	async function onSubmit(data: LoginValues) {
		setServerError(null);
		try {
			// DummyJSON public auth endpoint — uses demo credentials for prototype
			const res = await fetch("https://dummyjson.com/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username: "emilys", password: "emilyspass" }),
			});

			if (!res.ok) {
				setServerError("Invalid email or password. Please try again.");
				return;
			}

			const authData = await res.json();

			if (data.rememberMe) {
				localStorage.setItem("auth_token", authData.accessToken);
				localStorage.setItem("auth_user", JSON.stringify({ email: data.email }));
			} else {
				sessionStorage.setItem("auth_token", authData.accessToken);
				sessionStorage.setItem("auth_user", JSON.stringify({ email: data.email }));
			}

			router.push("/");
		} catch {
			setServerError("Something went wrong. Please check your connection and try again.");
		}
	}

	return (
		<div className="space-y-6">
			{/* Google Sign-in Button */}
			<button
				type="button"
				className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1a7a7a] focus:ring-offset-2"
			>
				<GoogleIcon />
				Continue with Google
			</button>

			{/* Divider */}
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-gray-200" />
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="bg-white px-3 text-gray-400">
						or Sign in with Email
					</span>
				</div>
			</div>

			{/* Login Form */}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4"
				noValidate
				data-testid="login-form"
			>
				{serverError && (
					<div
						role="alert"
						className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
					>
						{serverError}
					</div>
				)}

				{/* Email */}
				<div className="space-y-1">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						autoComplete="email"
						placeholder="example@gmail.com"
						{...register("email")}
						className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#1a7a7a] focus:outline-none focus:ring-1 focus:ring-[#1a7a7a] disabled:cursor-not-allowed disabled:opacity-50"
						disabled={isSubmitting}
					/>
					{errors.email && (
						<p role="alert" className="text-xs text-red-500">
							{errors.email.message}
						</p>
					)}
				</div>

				{/* Password */}
				<div className="space-y-1">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700"
					>
						Password
					</label>
					<div className="relative">
						<input
							id="password"
							type={showPassword ? "text" : "password"}
							autoComplete="current-password"
							placeholder="••••••••"
							{...register("password")}
							className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#1a7a7a] focus:outline-none focus:ring-1 focus:ring-[#1a7a7a] disabled:cursor-not-allowed disabled:opacity-50"
							disabled={isSubmitting}
						/>
						<button
							type="button"
							className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
							onClick={() => setShowPassword((v) => !v)}
							tabIndex={-1}
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? (
								<Lucide.EyeOff className="size-4" />
							) : (
								<Lucide.Eye className="size-4" />
							)}
						</button>
					</div>
					{errors.password && (
						<p role="alert" className="text-xs text-red-500">
							{errors.password.message}
						</p>
					)}
				</div>

				{/* Remember me + Forgot password */}
				<div className="flex items-center justify-between">
					<label className="flex cursor-pointer items-center gap-2">
						<input
							type="checkbox"
							{...register("rememberMe")}
							className="h-4 w-4 rounded border-gray-300 text-[#1a7a7a] focus:ring-[#1a7a7a]"
						/>
						<span className="text-sm text-gray-600">Remember Me</span>
					</label>
					<a
						href="#"
						className="text-sm font-medium text-[#1a7a7a] hover:underline"
					>
						Forgot Password?
					</a>
				</div>

				{/* Submit */}
				<button
					type="submit"
					disabled={isSubmitting}
					className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1a7a7a] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#156666] focus:outline-none focus:ring-2 focus:ring-[#1a7a7a] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{isSubmitting && <Lucide.Loader2 className="size-4 animate-spin" />}
					{isSubmitting ? "Logging in..." : "Login"}
				</button>
			</form>
		</div>
	);
}

function GoogleIcon() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
				fill="#4285F4"
			/>
			<path
				d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
				fill="#34A853"
			/>
			<path
				d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
				fill="#FBBC05"
			/>
			<path
				d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
				fill="#EA4335"
			/>
		</svg>
	);
}
