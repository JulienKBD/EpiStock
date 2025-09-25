"use client";

import * as React from "react";
import { ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage(): ReactElement {
  const router = useRouter();
  const [error, setError] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const body = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (result.token) {
        window.localStorage.setItem("token", result.token);
        router.push("/");
      } else {
        setError(result.msg || "Identifiants incorrects. Veuillez réessayer.");
        console.error("Login failed:", result.msg || "Unknown error");
      }
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  return (
    <div className="flex pt-20 items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Connexion
          </CardTitle>
          {error && (
            <div className="flex text-red-600 justify-center">
              {error}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="exemple@email.com"
                className="bg-slate-100 text-slate-800 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                className="bg-slate-100 text-slate-800 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            >
              Se connecter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
