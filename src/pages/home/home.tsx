import { type ReactElement } from "react";

import DefaultLayout from "@/layouts/default.tsx";
import HomeCarousel from "@/components/ui/home/home_carousel.tsx";
import HomeStory from "@/components/ui/home/home_story.tsx";
import HomeMenu from "@/components/ui/home/home_menu.tsx";
import HomeCoffeeApp from "@/components/ui/home/home_coffee_app.tsx";
import HomeSpace from "@/components/ui/home/home_space.tsx";
import HomeCommunityEvent from "@/components/ui/home/home_community_event.tsx";
import HomeNew from "@/components/ui/home/home_new.tsx";

export default function Home(): ReactElement {
  return (
    <DefaultLayout>
      <HomeCarousel />
      <HomeStory />
      <HomeMenu />
      <HomeCoffeeApp />
      <HomeSpace />
      <HomeCommunityEvent />
      <HomeNew />
    </DefaultLayout>
  );
}
