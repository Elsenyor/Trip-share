/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import useConfig from "./hooks/useConfig";
import Star from "./star";

const parentStyles = {
	overflow: "hidden",
	position: "relative",
};

function getHalfStarStyles(color, uniqueness) {
	return `
    .react-stars-${uniqueness}:before {
      position: absolute;
      overflow: hidden;
      display: block;
      z-index: 1;
      top: 0;
      left: 0;
      width: 50%;
      content: attr(data-forhalf);
      color: ${color};
    }
  `;
}

function getHalfStarStyleForIcons(color) {
	return `
    span.react-stars-half > * {
      color: ${color};
    }
  `;
}

function ReactStars(props) {
	const [uniqueness] = useState(() => (Math.random() + "").replace(".", ""));
	const [currentValue, setCurrentValue] = useState(props.value || 0);
	const [stars, setStars] = useState([]);
	const [isUsingIcons, setIsUsingIcons] = useState(false);
	const [config, setConfig] = useConfig(props);
	const [halfStarAt, setHalfStarAt] = useState(0);
	const [halfStarHidden, setHalfStarHidden] = useState(false);

	const isDecimal = (value) => value % 1 !== 0;

	const getRate = useCallback(() => (config.isHalf ? Math.floor(currentValue) : Math.round(currentValue)), [config.isHalf, currentValue]);

	const iconsUsed = useCallback(
		(config) =>
			(!config.isHalf && config.emptyIcon && config.filledIcon) || (config.isHalf && config.emptyIcon && config.halfIcon && config.filledIcon),
		[]
	);

	const generateStars = useCallback(
		(activeCount) => {
			const activeStars = activeCount ?? getRate();
			return Array.from({ length: config.count }, (_, i) => ({
				active: i < activeStars,
			}));
		},
		[config.count, getRate]
	);

	useEffect(() => {
		setStars(generateStars(props.value));
		setConfig(props);
		setIsUsingIcons(iconsUsed(props));
		setHalfStarAt(Math.floor(props.value));
		setHalfStarHidden(props.isHalf && props.value % 1 === 0);
	}, [props, setConfig, generateStars, iconsUsed]);

	const updateStars = useCallback(
		(index) => {
			const currentActive = stars.filter((x) => x.active).length;
			if (index !== currentActive) {
				setStars(generateStars(index));
			}
		},
		[stars, generateStars]
	);

	const moreThanHalf = useCallback((event) => {
		const { target } = event;
		const boundingClientRect = target.getBoundingClientRect();
		const mouseAt = event.clientX - boundingClientRect.left;
		return Math.round(Math.abs(mouseAt)) > boundingClientRect.width / 2;
	}, []);

	const updateHalfStarValues = useCallback(
		(value) => {
			if (config.isHalf) {
				setHalfStarHidden(isDecimal(value));
				setHalfStarAt(Math.floor(value));
			}
		},
		[config.isHalf]
	);

	const handleMouseOver = useCallback(
		(event) => {
			if (!config.edit) return;

			let index = Number(event.currentTarget.getAttribute("data-index"));

			if (config.isHalf) {
				const isAtHalf = moreThanHalf(event);
				setHalfStarHidden(isAtHalf);
				if (isAtHalf) index += 1;
				setHalfStarAt(index);
			} else {
				index += 1;
			}

			updateStars(index);
		},
		[config.edit, config.isHalf, moreThanHalf, updateStars]
	);

	const handleMouseLeave = useCallback(() => {
		if (!config.edit) return;

		updateHalfStarValues(currentValue);
		setStars(generateStars());
	}, [config.edit, currentValue, updateHalfStarValues, generateStars]);

	const handleClick = useCallback(
		(event) => {
			if (!config.edit) return;

			let index = Number(event.currentTarget.getAttribute("data-index"));
			let value;
			if (config.isHalf) {
				const isAtHalf = moreThanHalf(event);
				setHalfStarHidden(isAtHalf);
				value = isAtHalf ? index + 1 : index + 0.5;
				setHalfStarAt(index);
			} else {
				value = index + 1;
			}

			currentValueUpdated(value);
		},
		[config.edit, config.isHalf, moreThanHalf]
	);

	const currentValueUpdated = useCallback(
		(value) => {
			if (value !== currentValue) {
				setStars(generateStars(value));
				setCurrentValue(value);
				props.onChange(value);
			}
		},
		[currentValue, generateStars, props]
	);

	const handleKeyDown = useCallback(
		(event) => {
			if (!config.a11y || !config.edit) return;

			const { key } = event;
			let value = currentValue;

			if (!isNaN(key)) {
				const keyNumber = Number(key);
				if (keyNumber > 0 && keyNumber <= config.count) {
					value = keyNumber;
				}
			} else if (key === "ArrowUp" || key === "ArrowRight") {
				if (value < config.count) {
					event.preventDefault();
					value += config.isHalf ? 0.5 : 1;
				}
			} else if (key === "ArrowDown" || key === "ArrowLeft") {
				if (value > 0.5) {
					event.preventDefault();
					value -= config.isHalf ? 0.5 : 1;
				}
			}

			updateHalfStarValues(value);
			currentValueUpdated(value);
		},
		[config.a11y, config.edit, config.count, config.isHalf, currentValue, updateHalfStarValues, currentValueUpdated]
	);

	const renderHalfStarStyleElement = useMemo(
		() => (
			<style
				dangerouslySetInnerHTML={{
					__html: isUsingIcons ? getHalfStarStyleForIcons(config.activeColor) : getHalfStarStyles(config.activeColor, uniqueness),
				}}
			/>
		),
		[config.activeColor, isUsingIcons, uniqueness]
	);

	const renderStars = useMemo(
		() =>
			stars.map((star, i) => (
				<Star
					key={i}
					index={i}
					active={star.active}
					config={config}
					onMouseOver={handleMouseOver}
					onMouseLeave={handleMouseLeave}
					onClick={handleClick}
					halfStarHidden={halfStarHidden}
					halfStarAt={halfStarAt}
					isUsingIcons={isUsingIcons}
					uniqueness={uniqueness}
				/>
			)),
		[stars, config, handleMouseOver, handleMouseLeave, handleClick, halfStarHidden, halfStarAt, isUsingIcons, uniqueness]
	);

	return (
		<div className={`react-stars-wrapper-${uniqueness}`} style={{ display: "flex" }}>
			<div
				tabIndex={config.a11y && config.edit ? 0 : null}
				aria-label="add rating by typing an integer from 0 to 5 or pressing arrow keys"
				onKeyDown={handleKeyDown}
				className={props.classNames ? `${props.classNames} react-stars` : "react-stars"}
				style={parentStyles}
			>
				{config.isHalf && renderHalfStarStyleElement}
				{renderStars}
				<p style={{ position: "absolute", left: "-200rem" }} role="status">
					{currentValue}
				</p>
			</div>
		</div>
	);
}

ReactStars.propTypes = {
	classNames: PropTypes.string,
	edit: PropTypes.bool,
	half: PropTypes.bool,
	isHalf: PropTypes.bool,
	value: PropTypes.number,
	count: PropTypes.number,
	char: PropTypes.string,
	size: PropTypes.number,
	color: PropTypes.string,
	activeColor: PropTypes.string,
	emptyIcon: PropTypes.element,
	halfIcon: PropTypes.element,
	filledIcon: PropTypes.element,
	a11y: PropTypes.bool,
	onChange: PropTypes.func,
};

ReactStars.defaultProps = {
	edit: true,
	half: false,
	value: 0,
	count: 5,
	char: "★",
	size: 15,
	color: "gray",
	activeColor: "#ffd700",
	a11y: true,
	onChange: () => {},
};

export default ReactStars;
