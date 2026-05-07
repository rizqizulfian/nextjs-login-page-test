import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.describe("@feature-login", () => {
	test("has correct page title", async ({ page }) => {
		await page.goto("/login");
		await expect(page).toHaveTitle(/Login | Zero One Group/);
	});

	test("renders login page elements", async ({ page }) => {
		await page.goto("/login");

		await expect(page.getByRole("heading", { name: "Login to your Account" })).toBeVisible();
		await expect(page.getByLabel("Email")).toBeVisible();
		await expect(page.getByLabel("Password")).toBeVisible();
		await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
		await expect(page.getByText(/continue with google/i)).toBeVisible();
		await expect(page.getByText(/forgot password/i)).toBeVisible();
		await expect(page.getByText(/create an account/i)).toBeVisible();
	});

	test("shows validation errors on empty form submission", async ({ page }) => {
		await page.goto("/login");

		await page.getByRole("button", { name: /^login$/i }).click();

		await expect(page.getByText("Email is required")).toBeVisible();
		await expect(page.getByText("Password is required")).toBeVisible();
	});

	test("shows validation error for invalid email format", async ({ page }) => {
		await page.goto("/login");

		await page.getByLabel("Email").fill("not-an-email");
		await page.getByLabel("Password").fill("somepassword");
		await page.getByRole("button", { name: /^login$/i }).click();

		await expect(page.getByText("Please enter a valid email address")).toBeVisible();
	});

	test("toggles password visibility", async ({ page }) => {
		await page.goto("/login");

		const passwordInput = page.getByLabel("Password");
		await expect(passwordInput).toHaveAttribute("type", "password");

		await page.getByLabel("Show password").click();
		await expect(passwordInput).toHaveAttribute("type", "text");

		await page.getByLabel("Hide password").click();
		await expect(passwordInput).toHaveAttribute("type", "password");
	});

	test("successful login redirects to dashboard", async ({ page }) => {
		await page.goto("/login");

		await page.getByLabel("Email").fill("test@example.com");
		await page.getByLabel("Password").fill("anypassword");
		await page.getByRole("button", { name: /^login$/i }).click();

		await page.waitForURL("/", { timeout: 10000 });
		await expect(page).toHaveURL("/");
	});

	test("renders hero section on desktop", async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 800 });
		await page.goto("/login");

		await expect(page.getByText("Transformation Partner")).toBeVisible();
	});

	test("hero section is hidden on mobile", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 812 });
		await page.goto("/login");

		const leftPanel = page.locator("div.hidden.lg\\:flex");
		await expect(leftPanel).toBeHidden();
	});
});
