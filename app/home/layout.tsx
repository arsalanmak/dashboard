"use client";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
// import SidebarNav from "@/components/SidebarNav";
import { useGlobalContext } from "@/app/context/store";
import SidebarNav from "@/components/ui/SidebarNav";

const sidebarNavItems: ISidebarNavItem[] = [
  {
    title: "Dashboard",
    href: "/home",
  },
  {
    title: "Messages",
    href: "/home/messages",
  },
  {
    title: "Calender",
    href: "/home/calender",
  },
  {
    title: "Files",
    href: "/home/files",
  },
  {
    title: "Settings",
    href: "/home/settings",
  },
];

function HomeLayout({ children }: { children: React.ReactNode }) {
  const { isLogin } = useGlobalContext();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!isLogin) {
      router.replace("/");
    }
  }, [isLogin, router]);

  return (
    <>
      {isLogin ? (
        <div className="flex ">
          <aside className="w-1/5">
            <h1 className="text-4xl font-bold text-center my-8">Testing</h1>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          {children}
        </div>
      ) : null}
    </>
  );
}
export default HomeLayout;
