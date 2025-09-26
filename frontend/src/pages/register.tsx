"use client";

import * as React from "react";
import { ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage(): ReactElement {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const body = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };

    if (body.password !== body.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          password: body.password,
        }),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (result.token) {
        window.localStorage.setItem("token", result.token);
        router.push("/");
      } else {
        setError(result.msg || "Erreur lors de l'inscription.");
        console.error("Register failed:", result.msg || "Unknown error");
      }
    } catch (err) {
      console.error("Error sending request:", err);
      setError("Impossible de se connecter au serveur.");
    }
  };

  return (
    <div className="flex pt-20 items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Créez un compte
          </CardTitle>
          {error && (
            <div className="flex text-red-600 justify-center text-sm mt-2">
              {error}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Toto"
                className="bg-slate-100 text-slate-800 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="toto@epitech.eu"
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

            {/* Confirm password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
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
              S'inscrire
            </Button>

            <div className="flex gap-3 justify-center">
              <p>Vous avez déjà un compte ?</p>
              <Link
                href="/login"
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Se connecter
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
