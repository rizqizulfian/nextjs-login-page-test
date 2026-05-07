import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginForm } from "#/app/(auth)/login/form";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
	useRouter: vi.fn(() => ({ push: mockPush })),
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

const actor = userEvent.setup();

describe("LoginForm", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockPush.mockReset();
	});

	it("renders all form elements", () => {
		render(<LoginForm />);

		expect(screen.getByLabelText("Email")).toBeInTheDocument();
		expect(screen.getByLabelText("Password")).toBeInTheDocument();
		expect(screen.getByRole("checkbox")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /^login$/i })).toBeInTheDocument();
		expect(screen.getByText(/continue with google/i)).toBeInTheDocument();
		expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
	});

	it("shows validation errors on empty form submission", async () => {
		render(<LoginForm />);

		await actor.click(screen.getByRole("button", { name: /^login$/i }));

		await waitFor(() => {
			expect(screen.getByText("Email is required")).toBeInTheDocument();
			expect(screen.getByText("Password is required")).toBeInTheDocument();
		});
	});

	it("shows validation error for invalid email format", async () => {
		render(<LoginForm />);

		await actor.type(screen.getByLabelText("Email"), "not-an-email");
		await actor.type(screen.getByLabelText("Password"), "secret");
		await actor.click(screen.getByRole("button", { name: /^login$/i }));

		await waitFor(() => {
			expect(
				screen.getByText("Please enter a valid email address"),
			).toBeInTheDocument();
		});
	});

	it("calls DummyJSON API and redirects on successful login", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				accessToken: "fake-token",
				id: 1,
				email: "emily@example.com",
			}),
		});

		render(<LoginForm />);

		await actor.type(screen.getByLabelText("Email"), "test@example.com");
		await actor.type(screen.getByLabelText("Password"), "password123");
		await actor.click(screen.getByRole("button", { name: /^login$/i }));

		await waitFor(() => {
			expect(mockFetch).toHaveBeenCalledWith(
				"https://dummyjson.com/auth/login",
				expect.objectContaining({ method: "POST" }),
			);
			expect(mockPush).toHaveBeenCalledWith("/");
		});
	});

	it("shows error message when API returns non-ok response", async () => {
		mockFetch.mockResolvedValueOnce({ ok: false });

		render(<LoginForm />);

		await actor.type(screen.getByLabelText("Email"), "test@example.com");
		await actor.type(screen.getByLabelText("Password"), "wrongpass");
		await actor.click(screen.getByRole("button", { name: /^login$/i }));

		await waitFor(() => {
			expect(
				screen.getByText(/invalid email or password/i),
			).toBeInTheDocument();
		});
	});

	it("shows error message on network failure", async () => {
		mockFetch.mockRejectedValueOnce(new Error("Network Error"));

		render(<LoginForm />);

		await actor.type(screen.getByLabelText("Email"), "test@example.com");
		await actor.type(screen.getByLabelText("Password"), "password123");
		await actor.click(screen.getByRole("button", { name: /^login$/i }));

		await waitFor(() => {
			expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
		});
	});

	it("toggles password visibility when eye icon is clicked", async () => {
		render(<LoginForm />);

		const passwordInput = screen.getByLabelText("Password");
		expect(passwordInput).toHaveAttribute("type", "password");

		await actor.click(screen.getByLabelText("Show password"));
		expect(passwordInput).toHaveAttribute("type", "text");

		await actor.click(screen.getByLabelText("Hide password"));
		expect(passwordInput).toHaveAttribute("type", "password");
	});

	it("disables submit button while form is submitting", async () => {
		mockFetch.mockImplementationOnce(
			() =>
				new Promise((resolve) =>
					setTimeout(
						() => resolve({ ok: true, json: async () => ({ accessToken: "t" }) }),
						500,
					),
				),
		);

		render(<LoginForm />);

		await actor.type(screen.getByLabelText("Email"), "test@example.com");
		await actor.type(screen.getByLabelText("Password"), "password123");
		await actor.click(screen.getByRole("button", { name: /^login$/i }));

		await waitFor(() => {
			expect(screen.getByRole("button", { name: /logging in/i })).toBeDisabled();
		});
	});

	it("stores token in localStorage when Remember Me is checked", async () => {
		const localStorageSpy = vi.spyOn(Storage.prototype, "setItem");
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({ accessToken: "test-token" }),
		});

		render(<LoginForm />);

		await actor.type(screen.getByLabelText("Email"), "test@example.com");
		await actor.type(screen.getByLabelText("Password"), "password123");
		await actor.click(screen.getByRole("checkbox"));
		await actor.click(screen.getByRole("button", { name: /^login$/i }));

		await waitFor(() => {
			expect(localStorageSpy).toHaveBeenCalledWith("auth_token", "test-token");
		});
	});
});
