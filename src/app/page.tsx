"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Question = {
  id: number;
  text: string;
  options: {
    text: string;
    value: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
  }[];
};

const MBTIQuiz: React.FC = () => {
  // ===== Static data (memo untuk jaga stabilitas referensi) =====
  const questions: Question[] = useMemo(
    () => [
      {
        id: 1,
        text: "Dalam situasi sosial, Anda lebih sering...",
        options: [
          { text: "Berinteraksi dengan banyak orang", value: "E" },
          { text: "Berbicara dengan satu atau dua orang", value: "I" },
        ],
      },
      {
        id: 2,
        text: "Anda lebih tertarik pada...",
        options: [
          { text: "Fakta dan detail konkret", value: "S" },
          { text: "Kemungkinan dan ide-ide baru", value: "N" },
        ],
      },
      {
        id: 3,
        text: "Dalam membuat keputusan, Anda lebih mengutamakan...",
        options: [
          { text: "Logika dan objektivitas", value: "T" },
          { text: "Perasaan dan harmoni", value: "F" },
        ],
      },
      {
        id: 4,
        text: "Anda lebih suka hidup yang...",
        options: [
          { text: "Terencana dan terstruktur", value: "J" },
          { text: "Spontan dan fleksibel", value: "P" },
        ],
      },
      {
        id: 5,
        text: "Ketika menghadapi masalah, Anda cenderung...",
        options: [
          { text: "Mencari solusi praktis", value: "S" },
          { text: "Mempertimbangkan berbagai kemungkinan", value: "N" },
        ],
      },
      {
        id: 6,
        text: "Dalam bekerja, Anda lebih suka...",
        options: [
          { text: "Menyelesaikan satu tugas hingga tuntas", value: "J" },
          { text: "Bekerja pada beberapa hal sekaligus", value: "P" },
        ],
      },
      {
        id: 7,
        text: "Anda merasa lebih berenergi ketika...",
        options: [
          { text: "Sedang bersama orang lain", value: "E" },
          { text: "Memiliki waktu untuk diri sendiri", value: "I" },
        ],
      },
      {
        id: 8,
        text: "Anda lebih menghargai...",
        options: [
          { text: "Keadilan dan konsistensi", value: "T" },
          { text: "Empati dan pengertian", value: "F" },
        ],
      },
      {
        id: 9,
        text: "Dalam percakapan, Anda lebih fokus pada...",
        options: [
          { text: "Apa yang sedang dibicarakan", value: "S" },
          { text: "Apa yang mungkin dibicarakan", value: "N" },
        ],
      },
      {
        id: 10,
        text: "Anda lebih nyaman dengan...",
        options: [
          { text: "Kepastian dan keputusan final", value: "J" },
          { text: "Pilihan terbuka dan kemungkinan", value: "P" },
        ],
      },
      {
        id: 11,
        text: "Ketika bertemu orang baru, Anda cenderung...",
        options: [
          { text: "Memulai percakapan terlebih dahulu", value: "E" },
          { text: "Menunggu mereka memulai percakapan", value: "I" },
        ],
      },
      {
        id: 12,
        text: "Dalam mengevaluasi situasi, Anda lebih memperhatikan...",
        options: [
          { text: "Data dan bukti yang ada", value: "T" },
          { text: "Nilai-nilai dan dampak pada orang", value: "F" },
        ],
      },
    ],
    []
  );

  const mbtiTypes = useMemo(
    () => ({
      ISTJ: {
        title: "The Inspector",
        description:
          "Anda adalah pribadi yang praktis, faktual, dan dapat diandalkan. Anda menghargai tradisi dan ketertiban, serta bertanggung jawab atas komitmen yang Anda buat. Kehidupan yang terstruktur memberikan Anda rasa aman dan stabilitas.",
        color: "bg-blue-100",
        textColor: "text-blue-800",
        icon: "📊",
      },
      ISFJ: {
        title: "The Protector",
        description:
          "Anda adalah pribadi yang hangat, penuh perhatian, dan bertanggung jawab. Anda sangat peka terhadap perasaan orang lain dan berkomitmen untuk menjaga harmoni. Ketelitian dan kesetiaan adalah ciri khas Anda.",
        color: "bg-green-100",
        textColor: "text-green-800",
        icon: "🛡",
      },
      INFJ: {
        title: "The Counselor",
        description:
          "Anda adalah pribadi yang visioner, penuh empati, dan inspirasional. Anda mencari makna dan hubungan dalam ide, hubungan, dan materi yang bersifat spiritual. Anda berkomitmen pada nilai-nilai pribadi Anda.",
        color: "bg-purple-100",
        textColor: "text-purple-800",
        icon: "💭",
      },
      INTJ: {
        title: "The Mastermind",
        description:
          "Anda adalah pribadi yang independen, strategis, dan visioner. Anda memiliki kemampuan analitis yang kuat dan selalu mencari cara untuk meningkatkan sistem. Anda menghargai pengetahuan dan kompetensi.",
        color: "bg-indigo-100",
        textColor: "text-indigo-800",
        icon: "🧠",
      },
      ISTP: {
        title: "The Craftsman",
        description:
          "Anda adalah pribadi yang fleksibel, logis, dan praktis. Anda ahli dalam memahami bagaimana segala sesuatu bekerja dan senang memecahkan masalah dengan tangan Anda. Anda lebih suka tindakan daripada pembicaraan.",
        color: "bg-amber-100",
        textColor: "text-amber-800",
        icon: "🔧",
      },
      ISFP: {
        title: "The Artist",
        description:
          "Anda adalah pribadi yang penyayang, sensitif, dan spontan. Anda menghargai keindahan, kesenangan, dan pengalaman saat ini. Anda hidup sesuai dengan nilai-nilai Anda dan menikmati kebebasan pribadi.",
        color: "bg-pink-100",
        textColor: "text-pink-800",
        icon: "🎨",
      },
      INFP: {
        title: "The Healer",
        description:
          "Anda adalah pribadi yang idealis, penuh empati, dan kreatif. Anda didorong oleh nilai-nilai inti dan ingin membuat dunia menjadi tempat yang lebih baik. Anda sangat setia pada keyakinan dan orang-orang yang Anda pedulikan.",
        color: "bg-teal-100",
        textColor: "text-teal-800",
        icon: "❤",
      },
      INTP: {
        title: "The Architect",
        description:
          "Anda adalah pribadi yang logis, analitis, dan inovatif. Anda tertarik pada teori dan ide abstrak, lebih memilih untuk berfokus pada dunia internal daripada dunia sosial. Anda menghargai pengetahuan di atas segalanya.",
        color: "bg-cyan-100",
        textColor: "text-cyan-800",
        icon: "🏗",
      },
      ESTP: {
        title: "The Dynamo",
        description:
          "Anda adalah pribadi yang energik, pandai, dan persuasif. Anda menyukai aksi, petualangan, dan hidup pada saat ini. Anda pragmatis dan cepat dalam memecahkan masalah, sering menggunakan kemampuan Anda untuk menyelesaikan perselisihan.",
        color: "bg-orange-100",
        textColor: "text-orange-800",
        icon: "⚡",
      },
      ESFP: {
        title: "The Performer",
        description:
          "Anda adalah pribadi yang spontan, energik, dan antusias. Anda menyukai orang-orang dan kesenangan, membawa kegembiraan ke dalam kehidupan orang lain. Anda hidup untuk saat ini dan menikmati segala sesuatu yang ditawarkan kehidupan.",
        color: "bg-yellow-100",
        textColor: "text-yellow-800",
        icon: "🎭",
      },
      ENFP: {
        title: "The Champion",
        description:
          "Anda adalah pribadi yang antusias, kreatif, dan bersemangat. Anda adalah komunikator yang baik yang dapat menghubungkan orang dan ide. Anda optimis dan penuh energi, selalu mencari makna dan kemungkinan dalam kehidupan.",
        color: "bg-rose-100",
        textColor: "text-rose-800",
        icon: "🌟",
      },
      ENTP: {
        title: "The Visionary",
        description:
          "Anda adalah pribadi yang inovatif, cerdas, dan berpikiran cepat. Anda menikmati debat intelektual dan tantangan mental. Anda adalah pemecah masalah yang baik yang melihat pola di mana orang lain melihat kekacauan.",
        color: "bg-lime-100",
        textColor: "text-lime-800",
        icon: "🔍",
      },
      ESTJ: {
        title: "The Supervisor",
        description:
          "Anda adalah pribadi yang praktis, realistis, dan berorientasi pada hasil. Anda bertanggung jawab dan tradisional, percaya pada aturan dan prosedur yang telah terbukti. Anda adalah pemimpin alami yang mengatur orang dan proyek.",
        color: "bg-blue-100",
        textColor: "text-blue-800",
        icon: "👔",
      },
      ESFJ: {
        title: "The Provider",
        description:
          "Anda adalah pribadi yang hangat, peduli, dan populer. Anda peka terhadap kebutuhan orang lain dan bersemangat untuk membantu. Anda menghargai harmoni dan kooperasi, menciptakan lingkungan yang teratur dan bahagia.",
        color: "bg-green-100",
        textColor: "text-green-800",
        icon: "🤝",
      },
      ENFJ: {
        title: "The Teacher",
        description:
          "Anda adalah pribadi yang karismatik, persuasif, dan penuh inspirasi. Anda peka terhadap kebutuhan emosional orang lain dan berbakat dalam membimbing orang untuk tumbuh. Anda adalah pemimpin alami yang membawa yang terbaik dalam diri orang.",
        color: "bg-purple-100",
        textColor: "text-purple-800",
        icon: "👨‍🏫",
      },
      ENTJ: {
        title: "The Commander",
        description:
          "Anda adalah pribadi yang tegas, kompeten, dan berorientasi pada tujuan. Anda adalah pemimpin alami yang mengorganisir orang dan sumber daya untuk mencapai tujuan. Anda menghargai efisiensi dan kompetensi dalam semua hal.",
        color: "bg-indigo-100",
        textColor: "text-indigo-800",
        icon: "👑",
      },
    }),
    []
  );

  // ===== State =====
  const [mounted, setMounted] = useState(false); // guard hydration
  const [isStarted, setIsStarted] = useState(false); // fix tombol Mulai
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<
    Record<number, Question["options"][number]["value"]>
  >({});
  const [showResult, setShowResult] = useState(false);
  const [mbtiResult, setMbtiResult] = useState("");
  const [savedResult, setSavedResult] = useState("");

  // ===== Effects =====
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      const saved = localStorage.getItem("mbtiResult");
      if (saved) setSavedResult(saved);
    } catch {
      // abaikan error (mis. private mode)
    }
  }, [mounted]);

  // ===== Handlers =====
  const handleAnswer = (value: Question["options"][number]["value"]) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      // jeda kecil biar ada “rasa” klik
      setTimeout(() => setCurrentQuestion((q) => q + 1), 200);
    }
  };

  const calculateResult = () => {
    let e = 0,
      i = 0,
      s = 0,
      n = 0,
      t = 0,
      f = 0,
      j = 0,
      p = 0;

    Object.values(answers).forEach((ans) => {
      if (ans === "E") e++;
      else if (ans === "I") i++;
      else if (ans === "S") s++;
      else if (ans === "N") n++;
      else if (ans === "T") t++;
      else if (ans === "F") f++;
      else if (ans === "J") j++;
      else if (ans === "P") p++;
    });

    const result = `${e > i ? "E" : "I"}${s > n ? "S" : "N"}${
      t > f ? "T" : "F"
    }${j > p ? "J" : "P"}`;

    setMbtiResult(result);
    setShowResult(true);

    try {
      localStorage.setItem("mbtiResult", result);
    } catch {
      // abaikan jika tidak tersedia
    }
  };

  const goToPrevious = () => {
    setCurrentQuestion((q) => Math.max(0, q - 1));
  };

  const goToNext = () => {
    setCurrentQuestion((q) => Math.min(questions.length - 1, q + 1));
  };

  const restartQuiz = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResult(false);
    setMbtiResult("");
    setIsStarted(false);
  };

  const shareResult = () => {
    const title = "Hasil Tes MBTI Saya";
    const type = mbtiTypes[mbtiResult as keyof typeof mbtiTypes];
    const text = `Saya baru saja mengikuti tes MBTI dan hasilnya adalah ${mbtiResult} - ${type?.title}. Coba tes MBTI di MBTIQA oleh ACSI Corp!`;

    try {
      if (typeof navigator !== "undefined" && (navigator as any).share) {
        (navigator as any)
          .share({ title, text, url: window.location?.href })
          .catch(() => navigator.clipboard?.writeText(text));
      } else {
        navigator.clipboard?.writeText(text);
        alert("Hasil telah disalin ke clipboard!");
      }
    } catch {
      // fallback aman
      alert("Gagal berbagi. Silakan tempel manual.");
    }
  };

  // ===== Hydration guard =====
  if (!mounted) {
    // skeleton ringan (opsional)
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" />
    );
  }

  // ===== Landing (sekarang pakai isStarted) =====
  if (!isStarted && !showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">MBTIQA</h1>
          <p className="text-blue-600 mb-6">MBTI Quiz ACSI Corp</p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Kenali Dirimu Lewat MBTI!
            </h2>
            <p className="text-gray-600 mb-2 italic">
              "Character is not Guess, but a Reflection"
            </p>
          </div>

          <div className="mb-8">
            <Image
              src="/acsi_corp_logo.jpeg"
              alt="Illustration of personality assessment with colorful psychological symbols"
              width={100}
              height={100}
              className="rounded-lg mx-auto mb-4"
            />
            <p className="text-gray-600 mb-4">
              Temukan tipe kepribadian MBTI Anda dengan menjawab{" "}
              {questions.length} pertanyaan sederhana.
            </p>
          </div>

          {savedResult && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">
                Hasil tes sebelumnya: {savedResult}
              </p>
              <button
                type="button"
                onClick={() => {
                  setMbtiResult(savedResult);
                  setShowResult(true);
                }}
                className="mt-2 text-blue-600 hover:text-blue-800 underline"
              >
                Lihat hasil sebelumnya
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsStarted(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md"
          >
            Mulai Tes
          </button>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2023 ACSI Corp. All rights reserved.</p>
        </div>
      </div>
    );
  }

  // ===== Result =====
  if (showResult && mbtiResult) {
    const resultData = mbtiTypes[mbtiResult as keyof typeof mbtiTypes];

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            Hasil Tes MBTI Anda
          </h1>

          <div className={`${resultData.color} rounded-xl p-6 mb-6`}>
            <div className="text-5xl mb-4">{resultData.icon}</div>
            <h2 className={`text-2xl font-bold ${resultData.textColor} mb-2`}>
              {mbtiResult} - {resultData.title}
            </h2>
            <p className="text-gray-700">{resultData.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">
              Bagikan hasil Anda:
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={shareResult}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-3 rounded-full transition duration-300"
                aria-label="Share"
                title="Share"
              >
                <span className="text-lg">🔗</span>
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={restartQuiz}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              Ulangi Tes
            </button>
            <button
              type="button"
              onClick={() => setShowResult(false)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== Quiz =====
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-blue-800">MBTIQA</h2>
            <span className="text-sm text-gray-500">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {questions[currentQuestion].text}
          </h3>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => handleAnswer(option.value)}
                className={`w-full text-left p-4 rounded-lg border transition duration-300 ${
                  answers[currentQuestion] === option.value
                    ? "border-blue-500 bg-blue-50 text-blue-800"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={goToPrevious}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded-lg ${
              currentQuestion === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Sebelumnya
          </button>

          {currentQuestion === questions.length - 1 &&
          answers[currentQuestion] ? (
            <button
              type="button"
              onClick={calculateResult}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Lihat Hasil
            </button>
          ) : (
            <button
              type="button"
              onClick={goToNext}
              disabled={!answers[currentQuestion]}
              className={`px-4 py-2 rounded-lg ${
                !answers[currentQuestion]
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Selanjutnya
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MBTIQuiz;
