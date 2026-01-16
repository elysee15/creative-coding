function HeroVideo() {
  return (
    <section className="md:gap-4 gap-2 rounded-md overflow-hidden flex flex-col">
      <div className="relative aspect-video w-full h-full">
        <video
          src="https://player.vimeo.com/progressive_redirect/playback/1114117023/rendition/1080p/file.mp4?loc=external&signature=884e06f67cbd1a272570607a499f8a051b591e9ad6018a102f77200776865f9e"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        ></video>
      </div>

      <p className="md:text-xl text-base font-semibold">Showreel (2023—2025)</p>
    </section>
  );
}

export default HeroVideo;
