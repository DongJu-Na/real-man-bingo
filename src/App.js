import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Globe, Github, RefreshCcw } from "lucide-react";
import "./App.css";

const languages = {
  ko: {
    title: "빙고 게임",
    newGame: "새 게임",
    bingo: "빙고!",
    language: "언어",
    soundOn: "소리 켜기",
    soundOff: "소리 끄기",
    musicOn: "음악 켜기",
    musicOff: "음악 끄기",
    bingoSets: [ [
      "군대 가는 것을 당연하다고 생각한다", "키 180cm 이상", "체지방률 10% 미만", "사랑하는 여성을 위해 희생한다", "비위가 강하다",
      "자신은 죽어도 괜찮다고 생각한다", "운동을 취미로 즐긴다", "할복을 할 수 있다", "쓸데없는 말을 많이 하지 않는다", "편식하지 않는다",
      "잘 웃지 않는다", "체모가 짙고 굵다", "무뚝뚝하다", "손, 발이 크다", "많이 먹는다 (여자애처럼 깨작깨작 먹지 않는다)",
      "벌레, 귀신을 무서워하지 않는다", "대부분의 일에 겁이 없다", "카페 음료는 거의 먹지 않는다", "자지 크기가 월등하다", "자존심이 세다",
      "대인배다", "사정까지 오래 걸린다", "책임감이 강하다", "상남자라는 말을 들어본 적 있음", "승부욕이 강하고 지기 싫어한다"
    ],
    [
      "애플 안 씀", "스킨 로션 안 바름", "적립이나 할인 안 받음", "빗물로 세수해봄", "민트초코 싫어함",
      "술의 눈 좋아함", "집에서 팬티만 입음", "팬티는 트렁크만 입음", "고기반찬 없으면 밥 안 먹음", "게임할 때 힐러 안 함",
      "아버지랑 사이 안 좋음", "아무 데서나 잘 잠", "머리를 스스로 깎음", "삼성페이 안 씀", "무조건 서서 싸야 함",
      "블루클럽 감", "가방, 지갑 안 씀", "카페에 돈쓰기 아까움", "연애 경험이 적거나 없음", "탈모 있음",
      "재랑 놀면 안 된다는 소리 들어봄", "무조건 내 말이 맞음", "거짓말 잘 못함", "여자에게 철벽침", "샐러드 안 먹음"
    ],
    [
      "겨울엔 찬물, 여름엔 끓는 물로 샤워함", "카드 안 쓰고 현금만 씀", "핸드폰은 한 번 쓰고 부셔버림", "밥상에 고기 없으면 안 먹음", "면도날이 녹슬어 있음",
      "아이디/캐릭터명 지을 때 주먹으로 키보드 두 번 내리침", "공익임", "머리길이 3cm 이하임", "피곤하면 그 자리에 누워서 잠", "에어컨, 히터, 보일러 안 틂",
      "핸드폰으로 카톡/문자/인터넷 안 하고 전화만 함", "머리는 스스로 깎음", "집에서 팬티 외의 다른 의복을 걸치지 않음", "가방, 지갑 안 씀", "담배불 가스렌지로 붙임",
      "아버지가 죽었거나 수감 중임", "이름 세 글자 이상인 음료 안 마심", "컴퓨터 껐을 때 코드 뽑아서 꺾음", "벽돌 베고 잠", "저축/주식/코인 안 함",
      "초콜릿 좋아함", "엄마 부를 때 이름으로 부름", "5층 미만은 창문으로 뛰어내림", "과자봉지 터뜨려서 깜", "한쪽 눈을 가로지르는 흉터가 있음"
    ],
    [
      "걷지 않음", "소변은 페트병에 해결함", "덧셈, 뺄셈 가능 근데 곱하기는 힘줄 모름", "미세먼지를 마셔서 정화함", "취미로 여장을 함",
      "똥 마려우면 바지에 바로 쌈", "태어난 날짜 모름", "살면서 병원 가본 적 없음", "집에 대문이 없음", "대머리",
      "곰이랑 맞짱 떠본 적 있음", "바퀴벌레 맨손으로 잡음", "담배 피고 꽁초 씹어먹음", "물 대신 콜라만 마심", "밥 먹을 때 생쌀 먹음",
      "평생 맨발로 살아옴", "추우면 모닥불 피우고 잠", "양치 하루에 한 번만 함", "칫솔 대신 철수세미 사용", "집에 팬티가 없음",
      "배고프면 길바닥에 돌 주워먹음", "한여름에 샤워 안 함", "살면서 부엌에 들어가 본 적 없음", "휴대폰 사용할 줄 모름", "카페 가본 적 없음"
    ]
  ]
  },
  en: {
    title: "BINGO GAME",
    newGame: "New Game",
    bingo: "BINGO!",
    language: "Language",
    soundOn: "Sound On",
    soundOff: "Sound Off",
    musicOn: "Music On",
    musicOff: "Music Off",
    bingoSets: [
      [
        "Thinks going to the military is natural", "Height over 180cm", "Body fat under 10%", "Willing to sacrifice for a loved one", "Strong stomach",
        "Thinks dying is okay", "Enjoys exercise", "Can perform seppuku", "Doesn’t speak unnecessarily", "Not picky with food",
        "Rarely smiles", "Thick body hair", "Stoic personality", "Big hands and feet", "Eats a lot (not like picking bits)",
        "Not afraid of bugs or ghosts", "Rarely afraid of anything", "Doesn't drink café drinks", "Large penis", "Very prideful",
        "Big-hearted", "Takes long to ejaculate", "Highly responsible", "Called a ‘real man’ before", "Strong competitive spirit"
      ],
      [
        "Doesn't use Apple", "Doesn't use skin lotion", "Refuses points or discounts", "Washes face with rainwater", "Hates mint chocolate",
        "Loves soju's eye", "Only wears underwear at home", "Wears only trunk underwear", "Won't eat without meat side dishes", "Never plays healer",
        "Bad relationship with father", "Sleeps anywhere easily", "Cuts hair himself", "Doesn't use Samsung Pay", "Always pees standing",
        "Goes to Blue Club", "Doesn’t carry a bag or wallet", "Thinks coffee is a waste of money", "Little or no dating experience", "Balding",
        "Been told 'don't hang out with him'", "Always thinks he's right", "Bad at lying", "Cold to women", "Doesn't eat salad"
      ],
      [
        "Takes cold showers in winter, boiling in summer", "Only uses cash", "Breaks phone after one use", "Refuses meals without meat", "Rusty razors",
        "Types ID by smashing keyboard with fist", "Was a public service worker", "Hair shorter than 3cm", "Sleeps anywhere if tired", "Never uses heater/AC",
        "Only uses phone for calls", "Cuts hair himself", "Only wears underwear at home", "No bag or wallet", "Lights cigarette with stove",
        "Father is dead or in jail", "Doesn’t drink drinks with long names", "Unplugs and folds power cord when shutting down PC", "Sleeps on bricks", "Doesn't save/invest",
        "Loves chocolate", "Calls mom by name", "Jumps from windows under 5th floor", "Opens snacks by smashing them", "Has scar over one eye"
      ],
      [
        "Doesn't walk",  
        "Solves urination with a PET bottle",  
        "Can do addition and subtraction but struggles with multiplication",  
        "Purifies fine dust by breathing it in",  
        "Cross-dresses as a hobby",  
        "Poops in pants if needed",  
        "Doesn't know birth date",  
        "Has never been to the hospital",  
        "Doesn't have a front door at home",  
        "Bald",  
        "Has fought a bear",  
        "Catches cockroaches with bare hands",  
        "Smokes and eats the cigarette butt",  
        "Only drinks cola instead of water",  
        "Eats raw rice when eating",  
        "Lived barefoot all his life",  
        "Lights a bonfire and sleeps when cold",  
        "Brushes teeth only once a day",  
        "Uses steel wool instead of toothbrush",  
        "Owns no underwear at home",  
        "Eats rocks from the street when hungry",  
        "Doesn’t shower in summer",  
        "Has never been in a kitchen",  
        "Doesn’t know how to use a cellphone",  
        "Has never been to a café"
      ]
    ]
  },
  jp: {
    title: "ビンゴゲーム",
    newGame: "新しいゲーム",
    bingo: "ビンゴ！",
    language: "言語",
    soundOn: "音オン",
    soundOff: "音オフ",
    musicOn: "音楽オン",
    musicOff: "音楽オフ",
    bingoSets: [
      [
        "軍隊に行くのが当然だと思っている", "身長180cm以上", "体脂肪率10%未満", "愛する人のために犠牲になれる", "胃が強い",
        "死んでも構わないと思っている", "運動が趣味", "切腹できる", "無駄話をしない", "偏食しない",
        "あまり笑わない", "体毛が濃い", "無口で硬派", "手足が大きい", "たくさん食べる（チマチマしない）",
        "虫や幽霊を怖がらない", "ほとんどのことに恐れがない", "カフェの飲み物を飲まない", "サイズが大きい", "プライドが高い",
        "器が大きい", "射精まで時間がかかる", "責任感が強い", "「男らしい」と言われたことがある", "負けず嫌い"
      ],
      [
        "Appleを使わない", "スキンローションを使わない", "ポイントや割引を受けない", "雨水で顔を洗う", "ミントチョコが嫌い",
        "焼酎の目が好き", "家では下着だけ", "トランクスしか履かない", "肉がないとご飯を食べない", "ゲームでヒーラーをしない",
        "父親と仲が悪い", "どこでもすぐ寝られる", "自分で髪を切る", "Samsung Payを使わない", "立ってしか小便しない",
        "ブルークラブに行く", "カバンや財布を持たない", "カフェにお金を使いたくない", "恋愛経験が少ないか無い", "ハゲている",
        "「あいつとは遊ぶな」と言われたことがある", "常に自分が正しいと思う", "嘘が下手", "女性に冷たい", "サラダを食べない"
      ],
      [
        "冬は冷水、夏は熱湯でシャワー", "現金しか使わない", "携帯は一度使って壊す", "肉がないと食事をしない", "カミソリが錆びている",
        "IDを拳でキーボードに叩きつけて作る", "公益勤務だった", "髪の長さが3cm以下", "疲れたらその場で寝る", "エアコンや暖房は使わない",
        "電話しか使わない", "自分で散髪する", "家では下着だけ", "バッグや財布を持たない", "タバコはコンロで点火",
        "父が死んだか刑務所にいる", "名前が3文字以上の飲み物は飲まない", "パソコンを切ったらコードを抜いて折る", "レンガを枕に寝る", "貯金・投資をしない",
        "チョコレートが好き", "母を名前で呼ぶ", "5階以下なら窓から飛び降りる", "お菓子の袋を破裂させて開ける", "片目に傷がある"
      ],
      [
        "歩かない",
        "おしっこはペットボトルで解決する",
        "足し算と引き算はできるが掛け算は筋肉で覚える",
        "微細なホコリを吸って浄化する",
        "趣味で女装をする",
        "うんこしたくなったらズボンにそのままする",
        "自分の誕生日を知らない",
        "生まれてから病院に行ったことがない",
        "家に玄関がない",
        "ハゲている",
        "クマとタイマンを張ったことがある",
        "ゴキブリを素手で捕まえる",
        "タバコを吸って吸い殻も食べる",
        "水の代わりにコーラしか飲まない",
        "ご飯を食べる時に生米を食べる",
        "一生裸足で過ごす",
        "寒ければ焚き火してそのまま寝る",
        "歯磨きは一日一回だけする",
        "歯ブラシの代わりに金属たわしを使う",
        "家にパンツがない",
        "お腹が空いたら道端の石を食べる",
        "真夏でもシャワーしない",
        "人生で一度もキッチンに入ったことがない",
        "携帯電話の使い方を知らない",
        "カフェに行ったことがない"
      ]
      
    ]
  }
};



function App() {
  const [board, setBoard] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showBingo, setShowBingo] = useState(false);
  const [lang, setLang] = useState("ko");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [bingoMessage, setBingoMessage] = useState("");

  const clickSoundRef = useRef(null);
  const bingoSoundRef = useRef(null);
  const bgMusicRef = useRef(null);

  const t = languages[lang]; 
  const bingoSets = t.bingoSets; 

  useEffect(() => {
    initializeGame();

    clickSoundRef.current = new Audio(process.env.PUBLIC_URL + "/sounds/click.mp3");
    bingoSoundRef.current = new Audio(process.env.PUBLIC_URL + "/sounds/bingo.mp3");
    bgMusicRef.current = new Audio(process.env.PUBLIC_URL + "/sounds/background.mp3");

    bgMusicRef.current.loop = true;

    return () => {
      bgMusicRef.current.pause();
    };
  }, []);

  useEffect(() => {
    if (musicEnabled && bgMusicRef.current) {
      bgMusicRef.current.play().catch(() => {});
    } else {
      bgMusicRef.current?.pause();
    }
  }, [musicEnabled]);

  useEffect(() => {
    if (selected.length > 0) checkForBingo();
  }, [selected]);

  useEffect(() => {
    initializeGame();
   }, [lang]);

  useEffect(() => {
    const canvas = document.getElementById("protein-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    function Particle() {
      this.x = canvas.width * 0.93;
      this.y = canvas.height * 0.15;
      this.vx = Math.random() * 6 - 3;
      this.vy = -Math.random() * 15;
      this.s = Math.random() * 6 + 1;
      this.gravity = 0.3;
      this.opacity = 1;

      this.draw = function () {
        ctx.fillStyle = `rgba(139, 69, 19, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
        ctx.fill();
      };

      this.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.opacity -= 0.01;
      };
    }

    const interval = setInterval(() => {
      particles.push(new Particle());
    }, 5);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.opacity <= 0) particles.splice(i, 1);
      }
      requestAnimationFrame(animate);
    }

    animate();
    return () => clearInterval(interval);
  }, []);

  const initializeGame = () => {
    const set = bingoSets[Math.floor(Math.random() * bingoSets.length)];
    const shuffled = [...set].sort(() => 0.5 - Math.random());

    const newBoard = [];
    const newSelected = [];

    for (let i = 0; i < 5; i++) {
      newBoard.push(shuffled.slice(i * 5, i * 5 + 5));
      newSelected.push([false, false, false, false, false]);
    }

    setBoard(newBoard);
    setSelected(newSelected);
    setShowBingo(false);
  };

  const handleCellClick = (row, col) => {
    if (soundEnabled && clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(() => {});
    }

    const updated = selected.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? !c : c))
    );
    setSelected(updated);
  };

  const checkForBingo = () => {
    const size = 5;
    let count = 0;
  
    for (let i = 0; i < size; i++) {
      if (selected[i].every(c => c)) count++;
      if (selected.every(row => row[i])) count++;
    }
  
    if (selected.every((row, i) => row[i])) count++;
    if (selected.every((row, i) => row[size - 1 - i])) count++;
  
    if (count > 0) {
      const result = getBingoRank(count);
      setShowBingo(true);
      setBingoMessage(`${t.bingo} (${result})`);
  
      if (soundEnabled && bingoSoundRef.current) {
        bingoSoundRef.current.play().catch(() => {});
      }
  
      setTimeout(() => setShowBingo(false), 3000);
    }
  };

  const getBingoRank = (count) => {
    if (count >= 3) return "🧨 상남자";
    if (count === 2) return "🧂 하남자";
    if (count === 1) return "🥬 기지배";
    return "";
  };

  return (
    <div className="App">
      <canvas id="protein-canvas" className="protein-canvas"></canvas>

      <div className="smoke-background">
        <div className="cigarette">
          <div className="burning-tip"></div>
          <div className="smoke"></div>
        </div>
      </div>

      <div className="shaker-container">
        <div className="shaker-body">SHAKER</div>
      </div>

      <header className="App-header">
        <h1>{t.title}</h1>

        <div className="controls">
          <div className="dropdown">
            <button onClick={() => setShowLangDropdown(!showLangDropdown)} title={t.language}>
              <Globe size={20} />
            </button>
            <div className={`dropdownContent ${showLangDropdown ? "dropdownContentShow" : ""}`}>
              <div className="dropdownItem" onClick={() => setLang("ko")}>한국어</div>
              <div className="dropdownItem" onClick={() => setLang("en")}>English</div>
              <div className="dropdownItem" onClick={() => setLang("jp")}>日本語</div>
            </div>
          </div>

          <button onClick={() => setSoundEnabled(!soundEnabled)} title={soundEnabled ? t.soundOn : t.soundOff}>
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          <button onClick={() => setMusicEnabled(!musicEnabled)} title={musicEnabled ? t.musicOn : t.musicOff}>
            {musicEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          <button onClick={initializeGame}><RefreshCcw size={20}/></button>

          <button
            className="github-button"
            title="View on GitHub"
            onClick={() => window.open("https://github.com/DongJu-Na/real-man-bingo", "_blank")}
          >
            <Github size={20} style={{ marginRight: "6px" }} />
          </button>

          <button
            className="share-button"
            title="공유하기"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "상남자 빙고",
                  text: "나는 과연 상남자일까?",
                  url: window.location.href
                }).catch((e) => console.log("Share failed:", e));
              } else {
                alert("공유 기능을 지원하지 않는 브라우저입니다.");
              }
            }}
          >
            🔗 Share
          </button>
        </div>

        <div className="board">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell${selected[rowIndex][colIndex] ? " selected" : ""}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))
          )}
        </div>

        {showBingo && <div className="bingo-alert">{bingoMessage}</div>}
      </header>
    </div>
  );
}

export default App;
