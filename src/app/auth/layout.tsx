import type { Metadata } from "next";
import BackdropGradient from "@/components/global/backdrop-gradient";
import GlassCard from "@/components/global/glass-card";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="w-full h-screen flex flex-col text-center">
      <div className="flex h-8 gap-1 max-lg:hidden">
        <div className="flex-1 border" />
        <div
          className="h-full border-2 border-dashed w-52"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="w-24 border" />
        <div
          className="h-full border-2 border-dashed w-52"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="w-24 border" />
        <div
          className="h-full border-2 border-dashed w-52"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="flex-1 border" />
      </div>

      <section className="flex flex-1">
        <div className="relative w-[159px] border-r p-1 max-lg:hidden 2xl:flex-1">
          <div
            className="h-full w-full border-2 border-dashed"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container mx-auto flex items-center justify-center">
          <div className="flex flex-col w-full items-center py-24 max-w-[500px]">
            {children}
          </div>
        </div>

        <div className="relative w-[159px] p-1 max-lg:hidden border-r-0 border-l 2xl:flex-1">
          <div
            className="h-full w-full border-2 border-dashed"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
      </section>
      <div className="flex h-8 gap-1 max-lg:hidden">
        <div className="flex-1 border" />
        <div
          className="h-full border-2 border-dashed w-52"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="w-24 border" />
        <div
          className="h-full border-2 border-dashed w-52"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="w-24 border" />
        <div
          className="h-full border-2 border-dashed w-52"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23888888' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="flex-1 border" />
      </div>
    </main>
  );
}
