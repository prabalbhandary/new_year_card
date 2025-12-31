import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Star,
    ChevronLeft,
    ChevronRight,
    Download,
    Volume2,
    VolumeX,
    Heart,
    Sparkles,
    Gift,
    PartyPopper,
    Calendar,
    Smile,
    Camera,
    Share2,
    RefreshCw
} from 'lucide-react'
import html2canvas from 'html2canvas'

const allSongs = [
    'song_one.mp3',
    'song_two.mp3',
    'song_three.mp3',
    'song_four.mp3',
    'song_five.mp3',
    'song_six.mp3',
    'song_seven.mp3',
    'song_eight.mp3',
    'song_nine.mp3',
    'song_ten.mp3',
    'song_eleven.mp3'
]

const NewYearWishes = () => {
    const [userGender, setUserGender] = useState('male')
    const [partnerName, setPartnerName] = useState('Your Partner Name Here')
    const [yourName, setYourName] = useState('Your Name Here')
    const personalNote = 'Thank you for choosing me, every day.'

    const [started, setStarted] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [selectedWishes, setSelectedWishes] = useState([])
    const [selectedFeelings, setSelectedFeelings] = useState([])
    const [selectedMemories, setSelectedMemories] = useState([])
    const [customWish, setCustomWish] = useState('')
    const [musicOn, setMusicOn] = useState(true)
    const [currentSong, setCurrentSong] = useState('')
    const [confetti, setConfetti] = useState([])
    const [showFloatingHearts, setShowFloatingHearts] = useState(false)
    const [showNameForm, setShowNameForm] = useState(true)

    const audioRef = useRef(null)
    const summaryRef = useRef(null)

    const wishes = [
        'A year where you feel deeply supported',
        'Quiet moments that feel like home',
        'Growth without pressure',
        'Joy that arrives naturally',
        'Dreams pursued without fear',
        'Love that feels steady and safe'
    ]

    const feelings = [
        'Peace',
        'Security',
        'Excitement',
        'Comfort',
        'Trust',
        'Belonging'
    ]

    const memories = [
        'The laughs we shared',
        'Adventures we took',
        'Quiet nights together',
        'Inside jokes',
        'Supporting each other',
        'Growing together'
    ]

    const playRandomSong = () => {
        const randomIndex = Math.floor(Math.random() * allSongs.length)
        const songPath = require(`../assets/${allSongs[randomIndex]}`)
        setCurrentSong(songPath)
    }

    useEffect(() => {
        playRandomSong()
    }, [])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio || !currentSong) return

        audio.src = currentSong

        const handleSongEnd = () => {
            playRandomSong()
        }

        audio.addEventListener('ended', handleSongEnd)

        return () => {
            audio.removeEventListener('ended', handleSongEnd)
        }
    }, [currentSong])

    const triggerConfetti = () => {
        const newConfetti = Array.from({ length: 50 }, (_, i) => ({
            id: Date.now() + i,
            left: Math.random() * 100,
            delay: Math.random() * 0.5,
            duration: 2 + Math.random() * 2,
            color: ['#ec4899', '#f43f5e', '#f97316', '#fbbf24'][Math.floor(Math.random() * 4)]
        }))
        setConfetti(newConfetti)
        setTimeout(() => setConfetti([]), 4000)
    }

    const startExperience = async () => {
        if (!partnerName.trim() || !yourName.trim()) return
        setShowNameForm(false)
        setStarted(true)
        triggerConfetti()
        const audio = audioRef.current
        if (audio && musicOn) {
            audio.volume = 0.6
            try {
                await audio.play()
            } catch { }
        }
    }

    const toggleWish = index => {
        setSelectedWishes(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        )
        if (!selectedWishes.includes(index)) {
            setShowFloatingHearts(true)
            setTimeout(() => setShowFloatingHearts(false), 1000)
        }
    }

    const toggleFeeling = index => {
        setSelectedFeelings(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        )
    }

    const toggleMemory = index => {
        setSelectedMemories(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        )
    }

    const nextPage = () => {
        setCurrentPage(p => Math.min(p + 1, 4))
        if (currentPage === 3) {
            triggerConfetti()
        }
    }

    const prevPage = () => {
        setCurrentPage(p => Math.max(p - 1, 0))
    }

    const toggleMusic = async () => {
        const audio = audioRef.current
        if (!audio) return
        if (musicOn) {
            audio.pause()
            setMusicOn(false)
        } else {
            try {
                await audio.play()
                setMusicOn(true)
            } catch { }
        }
    }

    const downloadImage = async () => {
        if (!summaryRef.current) return
        const canvas = await html2canvas(summaryRef.current)
        const link = document.createElement('a')
        link.download = 'new-year-wishes-2026.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
    }

    const shareExperience = () => {
        if (navigator.share) {
            navigator.share({
                title: 'New Year Wishes 2026',
                text: `My wishes for ${partnerName} in 2026 ✨`
            }).catch(() => { })
        }
    }

    const resetExperience = () => {
        setStarted(false)
        setShowNameForm(true)
        setCurrentPage(0)
        setSelectedWishes([])
        setSelectedFeelings([])
        setSelectedMemories([])
        setCustomWish('')
        playRandomSong()
    }

    const NameForm = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-br from-pink-50 via-white to-orange-50"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-8"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                    <PartyPopper className="w-20 h-20 text-rose-500 relative z-10" />
                </div>
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-5xl font-bold mb-8 text-center"
                style={{
                    fontFamily: "'Playfair Display', serif",
                    background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #f97316 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}
            >
                Personalize Your Wishes
            </motion.h1>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
            >
                <div className="mb-6">
                    <label className="block text-gray-700 mb-3" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                        Your gender:
                    </label>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setUserGender('male')}
                            className={`flex-1 py-3 rounded-xl border-2 transition-all ${userGender === 'male' ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-gray-200 text-gray-600'}`}
                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                            Male
                        </button>
                        <button
                            onClick={() => setUserGender('female')}
                            className={`flex-1 py-3 rounded-xl border-2 transition-all ${userGender === 'female' ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-gray-200 text-gray-600'}`}
                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                            Female
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                        Your partner's name:
                    </label>
                    <input
                        type="text"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-400 focus:outline-none transition-all"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                        placeholder="Enter partner's name"
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-gray-700 mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                        Your name:
                    </label>
                    <input
                        type="text"
                        value={yourName}
                        onChange={(e) => setYourName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-rose-400 focus:outline-none transition-all"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                        placeholder="Enter your name"
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startExperience}
                    disabled={!partnerName.trim() || !yourName.trim()}
                    className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${!partnerName.trim() || !yourName.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:shadow-xl'}`}
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                    Begin Experience
                </motion.button>
            </motion.div>
        </motion.div>
    )

    const Welcome = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="min-h-[75vh] flex flex-col justify-center items-center text-center px-6 relative"
        >
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-1/4"
            >
                <Sparkles className="w-8 h-8 text-yellow-400 opacity-60" />
            </motion.div>

            <motion.div
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-32 right-1/4"
            >
                <Heart className="w-10 h-10 text-pink-400 opacity-50" />
            </motion.div>

            <motion.div
                animate={{
                    y: [0, -25, 0],
                    x: [0, 10, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-32 right-1/3"
            >
                <Star className="w-6 h-6 text-orange-400 opacity-40" />
            </motion.div>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="mb-8"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                    <PartyPopper className="w-20 h-20 text-rose-500 relative z-10" />
                </div>
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-6xl md:text-7xl font-bold mb-4 leading-tight"
                style={{
                    fontFamily: "'Playfair Display', serif",
                    background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #f97316 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}
            >
                Happy New Year
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-5xl md:text-6xl font-light mb-8"
                style={{ fontFamily: "'Dancing Script', cursive", color: '#be123c' }}
            >
                {partnerName}
            </motion.p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="max-w-lg"
            >
                <p className="text-xl text-gray-600 leading-relaxed mb-6" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    This is something I made just for you. A space to dream, choose, and remember what matters most as we step into 2026 together.
                </p>
                <p className="text-sm text-gray-400 italic" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    Take your time. There's no rush. Each page is a moment just for us. 💕
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-10 flex gap-2"
            >
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                        }}
                        className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-500"
                    />
                ))}
            </motion.div>
        </motion.div>
    )

    const Wishes = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 py-10 max-w-4xl mx-auto"
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-12"
            >
                <div className="inline-block mb-4">
                    <Gift className="w-12 h-12 text-rose-500 mx-auto" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-3"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        background: 'linear-gradient(135deg, #be123c 0%, #e11d48 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                    What do you want this year?
                </h2>
                <p className="text-gray-500 mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    Tap on what speaks to your heart ✨
                </p>
                <p className="text-sm text-gray-400" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    Choose as many as you like
                </p>
            </motion.div>

            {showFloatingHearts && (
                <div className="fixed inset-0 pointer-events-none z-50">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: window.innerWidth / 2,
                                y: window.innerHeight / 2,
                                scale: 0,
                                opacity: 1
                            }}
                            animate={{
                                x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
                                y: window.innerHeight / 2 - 200,
                                scale: 1,
                                opacity: 0
                            }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                        >
                            <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                        </motion.div>
                    ))}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
                {wishes.map((wish, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleWish(i)}
                        className={`cursor-pointer rounded-2xl px-6 py-6 transition-all duration-300 relative overflow-hidden group ${selectedWishes.includes(i)
                            ? 'bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 text-white shadow-2xl'
                            : 'bg-white text-gray-700 shadow-md hover:shadow-xl border-2 border-gray-100'
                            }`}
                    >
                        {selectedWishes.includes(i) && (
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="absolute top-3 right-3"
                            >
                                <Heart className="w-5 h-5 text-white fill-white" />
                            </motion.div>
                        )}

                        <p className={`text-lg leading-relaxed ${selectedWishes.includes(i) ? 'pr-8' : ''}`}
                            style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 500 }}>
                            {wish}
                        </p>

                        {!selectedWishes.includes(i) && (
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        )}
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
            >
                <p className="text-center text-gray-600 mb-3" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    Or write your own wish:
                </p>
                <input
                    type="text"
                    value={customWish}
                    onChange={(e) => setCustomWish(e.target.value)}
                    placeholder="Something special you wish for..."
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-all"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                />
            </motion.div>
        </motion.div>
    )

    const Feelings = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 py-10 max-w-4xl mx-auto"
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-12"
            >
                <div className="inline-block mb-4">
                    <Sparkles className="w-12 h-12 text-pink-500 mx-auto" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-3"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                    How do you want to feel?
                </h2>
                <p className="text-gray-500" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    Choose the emotions that resonate with you 💫
                </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {feelings.map((feeling, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleFeeling(i)}
                        className={`cursor-pointer rounded-2xl px-6 py-8 text-center transition-all duration-300 relative overflow-hidden ${selectedFeelings.includes(i)
                            ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-2xl'
                            : 'bg-white text-gray-700 shadow-md hover:shadow-xl border-2 border-gray-100'
                            }`}
                    >
                        <p className="text-xl font-semibold" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                            {feeling}
                        </p>

                        {selectedFeelings.includes(i) && (
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300 opacity-30" />
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center"
            >
                <p className="text-sm text-gray-400 mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    {selectedFeelings.length} feeling{selectedFeelings.length !== 1 ? 's' : ''} selected
                </p>
                <div className="flex justify-center gap-1">
                    {feelings.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 w-8 rounded-full transition-all duration-300 ${selectedFeelings.includes(i) ? 'bg-pink-500' : 'bg-gray-200'
                                }`}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )

    const Memories = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 py-10 max-w-4xl mx-auto"
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-12"
            >
                <div className="inline-block mb-4">
                    <Camera className="w-12 h-12 text-orange-500 mx-auto" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-3"
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                    What we'll remember from 2025
                </h2>
                <p className="text-gray-500" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    The beautiful moments we shared 🌟
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
                {memories.map((memory, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleMemory(i)}
                        className={`cursor-pointer rounded-2xl px-6 py-6 transition-all duration-300 relative overflow-hidden ${selectedMemories.includes(i)
                            ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-2xl'
                            : 'bg-white text-gray-700 shadow-md hover:shadow-xl border-2 border-gray-100'
                            }`}
                    >
                        {selectedMemories.includes(i) && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-3 right-3"
                            >
                                <Smile className="w-5 h-5 text-white fill-white" />
                            </motion.div>
                        )}

                        <p className={`text-lg leading-relaxed ${selectedMemories.includes(i) ? 'pr-8' : ''}`}
                            style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 500 }}>
                            {memory}
                        </p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-center bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6"
            >
                <Calendar className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <p className="text-gray-600 italic" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    "Every moment with you becomes a memory I treasure"
                </p>
            </motion.div>
        </motion.div>
    )

    const Summary = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[75vh] flex flex-col justify-center items-center px-6 py-12"
        >
            <div
                ref={summaryRef}
                className="bg-gradient-to-br from-pink-50 via-white to-orange-50 rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl opacity-30 -z-0"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-200 to-yellow-200 rounded-full blur-3xl opacity-30 -z-0"></div>

                <div className="relative z-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-full p-4">
                            <Star className="w-10 h-10 text-white" />
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-bold text-center mb-2"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            background: 'linear-gradient(135deg, #be123c 0%, #e11d48 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        For You, {partnerName}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center text-gray-500 mb-8"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                    >
                        Your wishes for 2026
                    </motion.p>

                    {(selectedWishes.length > 0 || selectedFeelings.length > 0 || customWish || selectedMemories.length > 0) && (
                        <div className="space-y-4 mb-8">
                            {selectedWishes.length > 0 && (
                                <div>
                                    <p className="text-sm font-semibold text-rose-600 mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        ✨ Your Wishes
                                    </p>
                                    {selectedWishes.map((wishIndex, i) => (
                                        <motion.div
                                            key={`wish-${wishIndex}`}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 + i * 0.1 }}
                                            className="bg-white rounded-xl px-5 py-3 shadow-sm border-l-4 border-rose-400 mb-2"
                                        >
                                            <p className="text-gray-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                {wishes[wishIndex]}
                                            </p>
                                        </motion.div>
                                    ))}
                                    {customWish && (
                                        <motion.div
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="bg-white rounded-xl px-5 py-3 shadow-sm border-l-4 border-rose-600 mb-2"
                                        >
                                            <p className="text-gray-700 italic" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                {customWish}
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            )}

                            {selectedFeelings.length > 0 && (
                                <div>
                                    <p className="text-sm font-semibold text-pink-600 mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        💫 How You Want to Feel
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedFeelings.map((feelingIndex, i) => (
                                            <motion.div
                                                key={`feeling-${feelingIndex}`}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.6 + i * 0.05 }}
                                                className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-full px-4 py-2"
                                            >
                                                <p className="text-sm font-medium text-gray-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                    {feelings[feelingIndex]}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedMemories.length > 0 && (
                                <div>
                                    <p className="text-sm font-semibold text-orange-600 mb-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                        🌟 Memories We Cherish
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedMemories.map((memoryIndex, i) => (
                                            <motion.div
                                                key={`memory-${memoryIndex}`}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.7 + i * 0.05 }}
                                                className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-full px-4 py-2"
                                            >
                                                <p className="text-sm font-medium text-gray-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                                    {memories[memoryIndex]}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-6 text-white text-center mb-6"
                    >
                        <p className="text-lg md:text-xl italic leading-relaxed" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 500 }}>
                            "{personalNote}"
                        </p>
                        <p className="mt-4 text-pink-100" style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.5rem' }}>
                            — {yourName}
                        </p>
                    </motion.div>

                    <div className="flex justify-center gap-3 flex-wrap">
                        <button
                            onClick={downloadImage}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                            <Download className="w-5 h-5" />
                            Download
                        </button>
                        <button
                            onClick={shareExperience}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-rose-500 font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-rose-200"
                        >
                            <Share2 className="w-5 h-5" />
                            Share
                        </button>
                        <button
                            onClick={resetExperience}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Restart
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )

    if (showNameForm) {
        return <NameForm />
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 overflow-hidden">
            {currentSong && <audio ref={audioRef} src={currentSong} />}

            <div className="fixed inset-0 pointer-events-none z-50">
                {confetti.map((piece) => (
                    <motion.div
                        key={piece.id}
                        initial={{ y: -20, x: `${piece.left}vw`, opacity: 1, rotate: 0 }}
                        animate={{
                            y: '100vh',
                            rotate: 360,
                            opacity: 0
                        }}
                        transition={{
                            duration: piece.duration,
                            delay: piece.delay,
                            ease: "easeIn"
                        }}
                        className="absolute w-3 h-3 rounded-full"
                        style={{ backgroundColor: piece.color }}
                    />
                ))}
            </div>

            {!started ? (
                <div className="absolute inset-0 flex flex-col justify-center items-center gap-6">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <PartyPopper className="w-16 h-16 text-rose-400 mb-4" />
                    </motion.div>
                    <button
                        onClick={startExperience}
                        className="px-10 py-6 text-2xl font-bold rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-2xl hover:shadow-xl hover:scale-105 transition-all"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                    >
                        Begin Our Journey
                    </button>
                    <p className="text-sm text-gray-400 italic" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                        🎧 Best experienced with sound
                    </p>
                </div>
            ) : (
                <div>
                    <div className="absolute top-5 right-5 flex gap-2 z-20">
                        <button onClick={toggleMusic} className="p-3 rounded-full bg-white shadow-md hover:shadow-xl transition-all">
                            {musicOn ? <Volume2 className="w-6 h-6 text-rose-500" /> : <VolumeX className="w-6 h-6 text-gray-400" />}
                        </button>
                    </div>

                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                        {[0, 1, 2, 3, 4].map((page) => (
                            <div
                                key={page}
                                className={`h-2 rounded-full transition-all duration-300 ${currentPage === page ? 'w-8 bg-rose-500' : 'w-2 bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {currentPage === 0 && <Welcome key="welcome" />}
                        {currentPage === 1 && <Wishes key="wishes" />}
                        {currentPage === 2 && <Feelings key="feelings" />}
                        {currentPage === 3 && <Memories key="memories" />}
                        {currentPage === 4 && <Summary key="summary" />}
                    </AnimatePresence>

                    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-20">
                        {currentPage > 0 && (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={prevPage}
                                className="p-3 rounded-full bg-white shadow-md hover:shadow-xl transition-all"
                            >
                                <ChevronLeft className="w-6 h-6 text-rose-500" />
                            </motion.button>
                        )}
                        {currentPage < 4 && (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={nextPage}
                                className="p-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-md hover:shadow-xl transition-all"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </motion.button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default NewYearWishes
