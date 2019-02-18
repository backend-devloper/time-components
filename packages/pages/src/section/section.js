import React from "react";
import { FlatList, View } from "react-native";
import PropTypes from "prop-types";
import sliceMap from "@times-components/edition-slices";
import SectionItemSeparator from "./section-item-separator";
import styles from "./styles";

const renderSlice = (slice, onPress) => {
  const Slice = sliceMap[slice.name];
  return Slice ? <Slice onPress={onPress} slice={slice} /> : null;
};

const Section = ({ onPress, section: { slices } }) => (
  <FlatList
    data={slices}
    ItemSeparatorComponent={() => (
      <View style={styles.listItemSeparatorContainer}>
        <SectionItemSeparator />
      </View>
    )}
    renderItem={({ item: slice }) => renderSlice(slice, onPress)}
  />
);

Section.propTypes = {
  onPress: PropTypes.func,
  section: PropTypes.shape({}).isRequired
};

Section.defaultProps = {
  onPress: () => {}
};
export default Section;