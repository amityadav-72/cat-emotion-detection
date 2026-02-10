const MusicPlayer = () => {
  return (
    <div>
      <h3>Relaxing Cat Music 🎵</h3>
      <audio controls>
        <source src="/music/cat-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MusicPlayer;
