import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.scss';

const featureData = {
	design: {
		title: '톤앤톤 UI 시스템',
		description:
			'일관된 색상, 간격, 타이포를 기준으로 확장 가능한 화면을 빠르게 구성합니다.',
	},
	flow: {
		title: '간결한 사용자 흐름',
		description:
			'랜딩에서 로그인, 상세까지 자연스럽게 이어지는 사용자 동선을 제공합니다.',
	},
	speed: {
		title: '빠른 구현 속도',
		description:
			'신입 개발자도 구조를 파악하기 쉬운 컴포넌트 단위로 구성되어 유지보수가 쉽습니다.',
	},
};

const sliderImages = [
	{
		src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
		alt: '협업하는 팀의 작업 장면',
		title: '팀 기반 프로젝트 시작',
		description: '아이디어부터 배포까지 빠르게 연결되는 작업 흐름을 만듭니다.',
	},
	{
		src: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80',
		alt: '디자인 시안을 확인하는 화면',
		title: '톤앤톤 디자인 일관성',
		description: '컴포넌트 단위로 통일된 스타일을 적용해 화면 완성도를 높입니다.',
	},
	{
		src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
		alt: '노트북에서 코드 작업하는 모습',
		title: '빠른 구현과 확장성',
		description: '처음 만든 구조를 유지한 채 기능을 안정적으로 추가할 수 있습니다.',
	},
];

function LandingPage() {
	const [activeFeature, setActiveFeature] = useState('design');
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isAutoPlay, setIsAutoPlay] = useState(true);

	useEffect(() => {
		if (!isAutoPlay) {
			return undefined;
		}

		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
		}, 4500);

		return () => clearInterval(timer);
	}, [isAutoPlay]);

	const handlePrevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
	};

	const handleNextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
	};

	return (
		<div className="landing-page">
			<section className="landing-hero">
				<div className="landing-hero__content">
					<span className="landing-hero__badge">React + dart.sass 기반</span>
					<h1>처음 시작하는 팀을 위한 안정적인 웹사이트 구조</h1>
					<p>
						페이지별 핵심 역할을 분리해 빠르게 개발하고, 전체 디자인의 톤을 일정하게 유지할 수
						있습니다.
					</p>

					<div className="landing-hero__actions">
						<Link to="/login" className="landing-hero__button landing-hero__button--primary">
							로그인 시작
						</Link>
						<Link to="/detail" className="landing-hero__button landing-hero__button--ghost">
							상세 보기
						</Link>
					</div>
				</div>

				<div className="landing-hero__slider" aria-label="메인 이미지 슬라이더">
					<div
						className="landing-hero__slider-track"
						style={{ transform: `translateX(-${currentSlide * 100}%)` }}
					>
						{sliderImages.map((slide) => (
							<div className="landing-hero__slide" key={slide.src}>
								<img src={slide.src} alt={slide.alt} />
								<div className="landing-hero__slide-copy">
									<strong>{slide.title}</strong>
									<span>{slide.description}</span>
								</div>
							</div>
						))}
					</div>

					<div className="landing-hero__slider-controls">
						<button type="button" onClick={handlePrevSlide} aria-label="이전 슬라이드">
							‹
						</button>
						<button type="button" onClick={handleNextSlide} aria-label="다음 슬라이드">
							›
						</button>
					</div>

					<div className="landing-hero__slider-dots">
						{sliderImages.map((slide, index) => (
							<button
								key={slide.src}
								type="button"
								className={currentSlide === index ? 'is-active' : ''}
								onClick={() => setCurrentSlide(index)}
								aria-label={`${index + 1}번 슬라이드 이동`}
							/>
						))}
					</div>

					<div className="landing-hero__slider-toggle">
						<button
							type="button"
							onClick={() => setIsAutoPlay((prev) => !prev)}
							aria-pressed={!isAutoPlay}
						>
							{isAutoPlay ? '자동재생 정지' : '자동재생 시작'}
						</button>
					</div>
				</div>
			</section>

			<section className="landing-feature" aria-label="주요 특징">
				<div className="landing-feature__cards">
					{Object.entries(featureData).map(([key, item]) => (
						<article
							key={key}
							className={`landing-feature__card ${activeFeature === key ? 'is-active' : ''}`}
							onMouseEnter={() => setActiveFeature(key)}
						>
							<h3>{item.title}</h3>
							<p>{item.description}</p>
						</article>
					))}
				</div>

				<div className="landing-feature__panel">
					<h2>{featureData[activeFeature].title}</h2>
					<p>{featureData[activeFeature].description}</p>
					<div className="landing-feature__visual-slot">
						<div className="landing-feature__orb landing-feature__orb--one" />
						<div className="landing-feature__orb landing-feature__orb--two" />
						<div className="landing-feature__orb landing-feature__orb--three" />
						<div className="landing-feature__pulse-ring" />
						<span>라이브 인터랙션 프리뷰</span>
					</div>
				</div>
			</section>
		</div>
	);
}

export default LandingPage;
