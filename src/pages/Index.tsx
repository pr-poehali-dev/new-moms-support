import Header from "@/components/Header";
import HeroAbout from "@/components/HeroAbout";
import SpecialistsBlog from "@/components/SpecialistsBlog";
import MeetingsFaqContacts from "@/components/MeetingsFaqContacts";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Header />
      <HeroAbout />
      <SpecialistsBlog />
      <MeetingsFaqContacts />
    </div>
  );
}
