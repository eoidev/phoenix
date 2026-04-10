export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#e5e7eb] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#6b7280]">© {year} Igor Slovák. All rights reserved.</p>
        <p className="text-xs text-[#6b7280]">Designed & built with care.</p>
      </div>
    </footer>
  );
}
