import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.scss';

function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			alert('이메일 형식의 아이디만 로그인할 수 있습니다.');
			return;
		}

		alert(`${email} 계정으로 로그인되었습니다.`);
		navigate('/detail', { state: { userEmail: email } });
	};

	return (
		<div className="login-page">
			<section className="login-card" aria-label="로그인 폼">
				<h1>로그인</h1>
				<p>이메일을 입력해주세요.</p>

				<form className="login-form" onSubmit={handleSubmit}>
					<label htmlFor="email">이메일</label>
					<input
						id="email"
						type="text"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						placeholder="example@email.com"
					/>

					<label htmlFor="password">비밀번호</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						placeholder="비밀번호 입력"
						required
					/>

					<button type="submit">로그인</button>
				</form>
			</section>
		</div>
	);
}

export default LoginPage;
