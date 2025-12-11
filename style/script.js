document.addEventListener('DOMContentLoaded', () => {
  // ⭐ THAY ĐỔI LINK NHẠC YOUTUBE TẠI ĐÂY ⭐
  const YOUTUBE_VIDEO_ID = '9nKncN5SMmM';  // Chỉ cần thay VIDEO_ID này
  const START_TIME = 0;  // Thời điểm bắt đầu phát (giây)
  // Cách lấy: Từ link https://www.youtube.com/watch?v=VIDEO_ID → Lấy phần sau watch?v=
  
  const gif = document.getElementById('gif');
  const question = document.getElementById('question');
  const noBtn = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');
  const sound1 = document.getElementById('bg-music1');
  const sound2 = document.getElementById('bg-music2');
  const sound3 = document.getElementById('bg-music3');
  const sound4 = document.getElementById('bg-music4');
  
  // Khởi tạo YouTube iframe
  if (sound4) {
    sound4.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0`;
  }

  function safePlay(audio) {
    if (!audio) return;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }

  const content = [
    { gif: 'https://i.pinimg.com/originals/7a/ef/73/7aef734a86dce4dc206976d4f0586f2c.gif', message: 'Em chắc chứ? 😢' },
    { gif: 'https://i.pinimg.com/originals/c8/07/e2/c807e26d8aed392f172f0bf441f60626.gif', message: 'Thử nghĩ lại nha 🥺' },
    { gif: 'https://i.pinimg.com/originals/0d/ac/7e/0dac7e14010362ff081e2167be218341.gif', message: 'Đừng mà, cho anh cơ hội đi 💔' },
    { gif: 'https://i.pinimg.com/originals/88/e7/86/88e786492cc527584feee199936813dd.gif', message: 'Thiệt luôn đó hả? 😭' },
    { gif: 'https://i.pinimg.com/originals/82/be/ae/82beaeb21c686871437f88bbc1593288.gif', message: 'Một lần nữa thôi, năn nỉ đó 😞' },
    { gif: 'https://i.pinimg.com/originals/97/91/de/9791de11497556c4a5e800427c48fc47.gif', message: 'Anh buồn đó nha... 😔' },
  ];

  let clickCount = 0;

  if (noBtn) {
    noBtn.addEventListener('click', () => {
      const index = clickCount % content.length;
      gif.src = content[index].gif;
      question.textContent = content[index].message;
      clickCount++;

      if (clickCount === 3) {
        noBtn.textContent = 'Bấm Có đi 😭';
      } else if (clickCount === 7) {
        noBtn.textContent = 'Năn nỉ đó bấm Có đi 😭';
      }

      if (clickCount <= 5) {
        safePlay(sound1);
      } else if (clickCount <= 8) {
        safePlay(sound2);
      } else {
        safePlay(sound3);
      }

      const emoji = document.createElement('div');
      emoji.textContent = '😭';
      emoji.classList.add('emoji-effect');

      const rect = noBtn.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      emoji.style.left = `${rect.left + rect.width / 2}px`;
      emoji.style.top = `${rect.top + scrollY}px`;

      document.body.appendChild(emoji);

      setTimeout(() => emoji.remove(), 1000);

      noBtn.classList.add('shake');
      setTimeout(() => noBtn.classList.remove('shake'), 600);
    });
  }

  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      question.textContent = 'Anh biết mà! Anh cũng thích Nhi nhiều lắm ❤️';
      gif.src = 'https://i.pinimg.com/originals/7e/f6/9c/7ef69cd0a6b0b78526c8ce983b3296fc.gif';
      noBtn.style.display = 'none';
      yesBtn.style.display = 'none';
      explodeHearts();
      if (sound4) {
        // Kích hoạt YouTube player với autoplay
        sound4.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&start=${START_TIME}&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0`;
      }
    });
  }

  function explodeHearts() {
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div');
      const icons = ['❤️', '💖'];
      heart.textContent = icons[Math.floor(Math.random() * icons.length)];
      heart.classList.add('emoji-effect');

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.fontSize = `${Math.random() * 1.5 + 1}rem`;

      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    }

    setTimeout(explodeHearts, 500);
  }
});
