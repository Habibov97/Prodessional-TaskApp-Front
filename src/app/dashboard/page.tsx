import DashboardContent from '@/components/DashboardContent';
import Welcoming from '@/components/Welcoming';

export default async function Home() {
  return (
    <section className="px-[76px] flex-1 ">
      <Welcoming />
      <DashboardContent />
    </section>
  );
}
