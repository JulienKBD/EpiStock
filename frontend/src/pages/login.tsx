"use client";

import { ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage(): ReactElement {
  return (
    <div className="flex pt-20 items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Connexion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
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
                type="password"
                placeholder="********"
                className="bg-slate-100 text-slate-800 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Submit */}
            <Button
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
