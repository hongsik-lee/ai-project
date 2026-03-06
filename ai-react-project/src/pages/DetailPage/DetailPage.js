import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './DetailPage.scss';

const specRows = [
	{ label: '서비스 유형', value: '웹사이트 구축 패키지' },
	{ label: '개발 스택', value: 'React + dart.sass' },
	{ label: '예상 기간', value: '2 ~ 4주' },
	{ label: '반응형 지원', value: '모바일/태블릿/PC' },
	{ label: '유지보수', value: '기본 문서 + 코드 가이드 제공' },
	{ label: '배포 방식', value: '정적 호스팅 또는 클라우드 배포' },
];

const packageCards = [
	{
		id: 'starter',
		title: 'Starter',
		description: '핵심 페이지 중심으로 빠르게 MVP를 시작하는 구성입니다.',
		benefit: '구성 기간 단축',
	},
	{
		id: 'growth',
		title: 'Growth',
		description: '컴포넌트 확장성과 운영 편의성을 함께 고려한 구성입니다.',
		benefit: '확장성 강화',
	},
	{
		id: 'pro',
		title: 'Pro',
		description: '브랜드 경험 중심의 인터랙션과 상세한 UI 설계를 포함합니다.',
		benefit: '사용성 향상',
	},
];

function DetailPage() {
	const location = useLocation();
	const userEmail = location.state?.userEmail;
	const [activeCard, setActiveCard] = useState(packageCards[0].id);
	const [selectedSpec, setSelectedSpec] = useState(specRows[0]);

	return (
		<div className="detail-page">
			<section className="detail-head">
				<p className="detail-head__breadcrumb">홈 / 상세페이지</p>
				<h1>보편적인 상세페이지 레이아웃</h1>
				<p className="detail-head__description">
					{userEmail
						? `${userEmail} 님, 로그인 상태로 상세 정보를 확인 중입니다.`
						: '제품 개요, 핵심 스펙, 안내 정보를 한 화면에서 확인할 수 있습니다.'}
				</p>
			</section>

			<section className="detail-summary">
				<div className="detail-summary__image-slot" aria-label="대표 이미지 영역">
					<img
						src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
						alt="웹사이트 상세 구성을 확인하는 작업 화면"
					/>
					<p className="detail-summary__image-caption">프로젝트 상세 구성 미리보기</p>
				</div>

				<div className="detail-summary__content">
					<h2>프리미엄 스타터 패키지</h2>
					<p className="price">₩129,000</p>
					<ul>
						<li>초기 세팅 템플릿 제공</li>
						<li>페이지 구조 설계 가이드</li>
						<li>기본 유지보수 문서 포함</li>
					</ul>

					<div className="detail-summary__actions">
						<button type="button">문의하기</button>
						<Link to="/">랜딩으로 돌아가기</Link>
					</div>
				</div>
			</section>

			<section className="detail-description">
				<article>
					<h3>상세 설명</h3>
					<p>
						실제 서비스에 바로 적용할 수 있도록 공통 레이아웃과 페이지 단위 컴포넌트를 분리한
						구조입니다. 추후 기능을 추가할 때도 동일한 디자인 톤을 유지하며 확장할 수 있습니다.
					</p>
				</article>
				<article>
					<h3>이용 안내</h3>
					<p>
						대표 이미지, 세부 스펙, 안내 문구 영역이 분리되어 있어 콘텐츠 업데이트가 쉽고 운영이
						간편합니다.
					</p>
				</article>
			</section>

			<section className="detail-grid" aria-label="그리드 테이블 정보">
				<h3>프로젝트 정보 테이블</h3>
				<div className="detail-grid__table" role="table" aria-label="프로젝트 스펙">
					<div className="detail-grid__head" role="rowgroup">
						<span role="columnheader">항목</span>
						<span role="columnheader">내용</span>
					</div>
					<div className="detail-grid__body" role="rowgroup">
						{specRows.map((row) => (
							<div
								className={`detail-grid__row ${selectedSpec.label === row.label ? 'is-selected' : ''}`}
								role="row"
								key={row.label}
								onClick={() => setSelectedSpec(row)}
								onKeyDown={(event) => {
									if (event.key === 'Enter' || event.key === ' ') {
										event.preventDefault();
										setSelectedSpec(row);
									}
								}}
								tabIndex={0}
							>
								<span role="cell">{row.label}</span>
								<span role="cell">{row.value}</span>
							</div>
						))}
					</div>
				</div>
				<div className="detail-grid__selected" aria-live="polite">
					<strong>선택된 항목</strong>
					<span>
						{selectedSpec.label} · {selectedSpec.value}
					</span>
				</div>
			</section>

			<section className="detail-cards" aria-label="카드형 UI">
				<div className="detail-cards__header">
					<h3>패키지 구성 카드</h3>
					<p>카드에 마우스를 올리거나 클릭하면 강조 상태가 바뀝니다.</p>
				</div>

				<div className="detail-cards__list">
					{packageCards.map((card) => (
						<article
							key={card.id}
							className={`detail-cards__item ${activeCard === card.id ? 'is-active' : ''}`}
							onMouseEnter={() => setActiveCard(card.id)}
							onClick={() => setActiveCard(card.id)}
						>
							<strong>{card.title}</strong>
							<p>{card.description}</p>
							<em>{card.benefit}</em>
						</article>
					))}
				</div>

				<div className="detail-cards__preview">
					{packageCards
						.filter((card) => card.id === activeCard)
						.map((card) => (
							<div key={card.id}>
								<h4>{card.title} 패키지 선택됨</h4>
								<p>{card.description}</p>
							</div>
						))}
				</div>
			</section>
		</div>
	);
}

export default DetailPage;
