import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [articleParams, setArticleParams] = useState(defaultArticleState);
	const applyParams = (newParams: ArticleStateType) => {
		setArticleParams(newParams);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={applyParams} />
			<Article />
		</main>
	);
};
