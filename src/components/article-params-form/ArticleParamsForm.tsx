import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	onApply: (parms: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const containerRef = useRef<HTMLElement>(null);

	const handleChange = <K extends keyof ArticleStateType>(
		field: K,
		value: ArticleStateType[K]
	) => {
		const newState = { ...formState };
		newState[field] = value;
		setFormState(newState);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		props.onApply(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		props.onApply(defaultArticleState);
	};

	useEffect(() => {
		if (!isOpen) return;
		const handleClickOutside = (e: MouseEvent) => {
			if (!e.target || !(e.target instanceof HTMLElement)) return;
			if (containerRef.current && !containerRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={containerRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(value) => handleChange('fontFamilyOption', value)}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) => handleChange('fontSizeOption', value)}
					/>
					<Separator />
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(value) => handleChange('fontColor', value)}
					/>
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(value) => handleChange('backgroundColor', value)}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(value) => handleChange('contentWidth', value)}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
