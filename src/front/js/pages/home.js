import React from "react";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {

	return (
		<div className="text-center mt-5">
			<h1>Hello Welcome to this app!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
