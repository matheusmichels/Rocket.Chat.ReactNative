import React from 'react';
import { View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import DisclosureIndicator from '../DisclosureIndicator';
import Touch from '../../utils/touch';
import { CustomIcon } from '../../lib/Icons';

import { COLOR_WHITE } from '../../constants/colors';
import styles from './styles';

const ActionItem = ({
	icon, name, description, type, event, route, params, testID, disabled, navigation
}) => {
	const onPressTouchable = () => {
		if (route) {
			navigation.navigate(route, params);
		}
		if (event) {
			return event();
		}
	};

	return (
		<Touch
			onPress={onPressTouchable}
			underlayColor={COLOR_WHITE}
			activeOpacity={0.5}
			accessibilityLabel={name}
			accessibilityTraits='button'
			testID={testID}
		>
			<View style={[styles.sectionItem, disabled && styles.sectionItemDisabled]}>
				{type === 'danger' ? (
					<>
						<CustomIcon key='icon' name={icon} size={24} style={[styles.sectionItemIcon, styles.textColorDanger]} />
						<Text key='name' style={[styles.sectionItemName, styles.textColorDanger]}>{ name }</Text>
					</>
				) : (
					<>
						<CustomIcon key='left-icon' name={icon} size={24} style={styles.sectionItemIcon} />
						<Text key='name' style={styles.sectionItemName}>{ name }</Text>
						{description ? <Text key='description' style={styles.sectionItemDescription}>{ description }</Text> : null}
						<DisclosureIndicator key='disclosure-indicator' />
					</>
				)}
			</View>
		</Touch>
	);
};

ActionItem.defaultProps = {
	description: null,
	type: null,
	event: null,
	params: null,
	route: null,
	disabled: false
};

ActionItem.propTypes = {
	icon: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	description: PropTypes.string,
	type: PropTypes.string,
	event: PropTypes.func,
	route: PropTypes.string,
	params: PropTypes.object,
	testID: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	navigation: PropTypes.shape({
		navigate: PropTypes.func
	}).isRequired
};

export default withNavigation(ActionItem);
