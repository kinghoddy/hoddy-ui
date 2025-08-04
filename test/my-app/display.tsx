import {
  Avatar,
  Button,
  CheckBox,
  Divider,
  OTPInput,
  Popup,
  RatingInput,
  RatingStars,
  SafeAreaView,
  SelectMenu,
  showFlashMessage,
  Spinner,
  TextField,
  TextField2,
  Typography,
  useColors,
} from "@hoddy-ui/core";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Display = () => {
  const colors = useColors();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [textValue, setTextValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [rating, setRating] = useState(4.5);

  // Layout animation test states
  const [popupContentItems, setPopupContentItems] = useState(1);

  const selectOptions = [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
    { label: "Option 3", value: "opt3" },
    { label: "Very Long Option Name That Shows Text Wrapping", value: "opt4" },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white[1],
    },
    content: {
      padding: 20,
    },
    section: {
      marginBottom: 40,
    },
    sectionTitle: {
      marginBottom: 20,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 15,
    },
    avatarRow: {
      flexDirection: "row",
      gap: 15,
      alignItems: "center",
      marginBottom: 15,
    },
    formSection: {
      gap: 15,
    },
    interactiveSection: {
      gap: 15,
    },
    colorShowcase: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 15,
    },
    ratingSection: {
      alignItems: "center",
      gap: 10,
      marginBottom: 15,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.section}>
            <Typography
              variant="h1"
              color="primary"
              style={{ textAlign: "center" }}
            >
              🎨 Hoddy UI Showcase
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              style={{ textAlign: "center", marginTop: 10 }}
            >
              A comprehensive demonstration of all components
            </Typography>
          </View>

          <Divider />

          {/* Typography Section */}
          <View style={styles.section}>
            <Typography variant="h2" style={styles.sectionTitle}>
              📝 Typography
            </Typography>
            <Typography variant="h1" gutterBottom={10}>
              Heading 1
            </Typography>
            <Typography variant="h2" gutterBottom={10}>
              Heading 2
            </Typography>
            <Typography variant="h3" gutterBottom={10}>
              Heading 3
            </Typography>
            <Typography variant="body1" gutterBottom={5}>
              Body 1 - Regular text for content
            </Typography>
            <Typography variant="body2" gutterBottom={5}>
              Body 2 - Secondary text
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Caption text for small details
            </Typography>
          </View>

          <Divider />

          {/* Safe Area Section */}
          <View style={styles.section}>
            <Typography variant="h2" style={styles.sectionTitle}>
              📱 Safe Area View
            </Typography>
            <Typography variant="body1" gutterBottom={10}>
              This entire showcase is wrapped in a SafeAreaView component that
              automatically handles safe area insets for different devices.
            </Typography>
            <View
              style={{
                backgroundColor: colors.info.light + "20",
                padding: 15,
                borderRadius: 10,
                borderLeftWidth: 4,
                borderLeftColor: colors.info.main,
              }}
            >
              <Typography variant="h3" color="info" gutterBottom={5}>
                ℹ️ SafeAreaView Benefits
              </Typography>
              <Typography variant="body2" color="textSecondary">
                • Handles notch areas on modern devices{"\n"}• Adjusts for
                status bar height{"\n"}• Cross-platform safe area management
                {"\n"}• Automatic Android padding adjustment
              </Typography>
            </View>
          </View>

          <Divider />

          {/* Buttons Section */}
          <View style={styles.section}>
            <Typography variant="h2" style={styles.sectionTitle}>
              🔘 Buttons
            </Typography>

            <Typography variant="h3" gutterBottom={10}>
              Variants
            </Typography>
            <View style={styles.row}>
              <Button title="Contained" variant="contained" />
              <Button title="Outlined" variant="outlined" />
              <Button title="Text" variant="text" />
            </View>

            <Typography variant="h3" gutterBottom={10}>
              Colors
            </Typography>
            <View style={styles.colorShowcase}>
              <Button title="Primary" color="primary" size="small" />
              <Button title="Secondary" color="secondary" size="small" />
              <Button title="Success" color="success" size="small" />
              <Button title="Warning" color="warning" size="small" />
              <Button title="Error" color="error" size="small" />
              <Button title="Info" color="info" size="small" />
            </View>

            <Typography variant="h3" gutterBottom={10}>
              Sizes
            </Typography>
            <View style={styles.row}>
              <Button title="Small" size="small" />
              <Button title="Normal" size="normal" />
              <Button title="Large" size="large" />
            </View>

            <Typography variant="h3" gutterBottom={10}>
              States
            </Typography>
            <View style={styles.row}>
              <Button title="Disabled" disabled />
              <Button title="Loading" loading />
              <Button title="Rounded" rounded />
            </View>
          </View>

          <Divider />

          {/* Avatars Section */}
          <View style={styles.section}>
            <Typography variant="h2" style={styles.sectionTitle}>
              👤 Avatars
            </Typography>

            <Typography variant="h3" gutterBottom={10}>
              Variants
            </Typography>
            <View style={styles.avatarRow}>
              <Avatar size={50} />
              <Avatar label="JD" size={50} color="primary" />
              <Avatar label="MK" size={50} color="secondary" />
              <Avatar label="UI" size={50} color="success" variant="outlined" />
            </View>

            <Typography variant="h3" gutterBottom={10}>
              Sizes
            </Typography>
            <View style={styles.avatarRow}>
              <Avatar label="S" size={30} color="info" />
              <Avatar label="M" size={40} color="warning" />
              <Avatar label="L" size={60} color="error" />
              <Avatar label="XL" size={80} color="primary" />
            </View>
          </View>

          <Divider />

          {/* Form Elements Section */}
          <View style={styles.section}>
            <Typography variant="h2" style={styles.sectionTitle}>
              📋 Form Elements
            </Typography>

            <View style={styles.formSection}>
              <TextField
                label="Standard TextField"
                value={textValue}
                onChangeText={setTextValue}
                helperText="This is helper text"
              />

              <TextField
                label="Outlined TextField"
                variant="outlined"
                value=""
                onChangeText={() => {}}
                color="secondary"
              />

              <TextField
                label="Text Variant"
                variant="text"
                value=""
                onChangeText={() => {}}
                color="success"
              />

              <CheckBox
                checked={checkboxValue}
                onChange={() => setCheckboxValue(!checkboxValue)}
                color="primary"
                label={
                  <Typography style={{ marginLeft: 10 }}>
                    Checkbox with custom label
                  </Typography>
                }
              />

              <View>
                <Typography variant="h3" gutterBottom={10}>
                  OTP Input
                </Typography>
                <OTPInput value={otp} onChange={setOtp} />
              </View>

              <Button
                title="Open Select Menu"
                onPress={() => setIsSelectOpen(true)}
                variant="outlined"
              />
            </View>
          </View>

          <Divider />

          {/* Rating Section */}
          <View style={styles.section}>
            <Typography variant="h2" style={styles.sectionTitle}>
              ⭐ Star Rating
            </Typography>

            <View style={styles.ratingSection}>
              <Typography variant="h3">Display Rating</Typography>
              <RatingStars rating={rating} size={24} />
              <Typography variant="body2" color="textSecondary">
                {rating} out of 5 stars
              </Typography>
            </View>

            <View style={styles.ratingSection}>
              <Typography variant="h3">Interactive Rating</Typography>
              <RatingInput
                rating={3}
                onSubmit={async (data) => {
                  setRating(data.rating);
                }}
                size={20}
              />
            </View>
          </View>

          <Divider />

          {/* Interactive Elements Section */}
          <View style={styles.section}>
            <Typography variant="h2" style={styles.sectionTitle}>
              🎯 Interactive Elements & Layout Animation
            </Typography>

            <View style={styles.interactiveSection}>
              <Button
                title="Show Flash Message"
                onPress={() =>
                  showFlashMessage({
                    message: "This is a success flash message with actions!",
                    title: "Success!",
                    type: "success",
                    actions: [
                      {
                        title: "Got it!",
                        onPress: () => console.log("Action pressed"),
                      },
                    ],
                  })
                }
                color="success"
              />

              <Button
                title="Show Error Message"
                onPress={() =>
                  showFlashMessage({
                    message: "Something went wrong. Please try again.",
                    title: "Error",
                    type: "error",
                  })
                }
                color="error"
              />

              <Button
                title="🎬 Test Layout Animation"
                onPress={() => setIsPopupOpen(true)}
                color="info"
              />

              <View
                style={{
                  backgroundColor: colors.info.light + "20",
                  padding: 15,
                  borderRadius: 10,
                  borderLeftWidth: 4,
                  borderLeftColor: colors.info.main,
                  marginTop: 15,
                }}
              >
                <Typography
                  variant="body2"
                  color="info"
                  style={{ textAlign: "center" }}
                >
                  👆 Tap "Test Layout Animation" to see smooth height
                  transitions in the popup! Add/remove content dynamically and
                  watch the modal animate.
                </Typography>
              </View>

              <View
                style={{
                  alignItems: "center",
                  padding: 20,
                  backgroundColor: colors.white[2],
                  borderRadius: 10,
                }}
              >
                <Typography variant="h3" gutterBottom={10}>
                  Loading Spinner
                </Typography>
                <Spinner color="primary" />
              </View>
            </View>
          </View>

          <Divider />

          {/* Footer */}
          <View style={styles.section}>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ textAlign: "center" }}
            >
              🎉 That's all the components in Hoddy UI! 🎉
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              style={{ textAlign: "center", marginTop: 10 }}
            >
              Built with ❤️ for React Native developers
            </Typography>
          </View>
        </View>

        {/* Layout Animation Test Popup */}
        <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} sheet>
          <Typography variant="h5" gutterBottom={15}>
            🎬 Layout Animation Test
          </Typography>
          <Typography variant="body2" gutterBottom={20} color="textSecondary">
            Test the popup's layout animation by adding and removing content
            dynamically. Notice how the modal height animates smoothly!
          </Typography>

          {/* Animation Test Controls */}
          <View
            style={{
              backgroundColor: colors.info.light + "20",
              padding: 15,
              borderRadius: 10,
              marginBottom: 20,
              borderLeftWidth: 4,
              borderLeftColor: colors.info.main,
            }}
          >
            <Typography fontWeight={500} color="info" gutterBottom={10}>
              🎛️ Animation Controls
            </Typography>

            {/* Content Items Counter */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Button
                title="-"
                size="small"
                onPress={() =>
                  setPopupContentItems(Math.max(0, popupContentItems - 1))
                }
                style={{ minWidth: 40 }}
              />
              <Typography variant="body1" style={{ marginHorizontal: 15 }}>
                Content Items: {popupContentItems}
              </Typography>
              <Button
                title="+"
                size="small"
                onPress={() =>
                  setPopupContentItems(Math.min(5, popupContentItems + 1))
                }
                style={{ minWidth: 40 }}
              />
            </View>
          </View>
          <TextField2 label="TextField 2" value="" />
          {/* Dynamic Content Area */}
          <View style={{ gap: 15 }}>
            {/* Rendered Content Items */}
            {Array.from({ length: popupContentItems }, (_, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: colors.white[2],
                  padding: 15,
                  borderRadius: 8,
                  borderLeftWidth: 3,
                  borderLeftColor: colors.primary.main,
                }}
              >
                <Typography fontWeight={500} gutterBottom={5}>
                  📦 Content Block {index + 1}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  This is dynamic content block number {index + 1}. Watch how
                  the modal animates when you add or remove these blocks!
                </Typography>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginTop: 20,
              paddingTop: 20,
              borderTopWidth: 1,
              borderTopColor: colors.white[3],
            }}
          >
            <Button
              title="Reset All"
              variant="outlined"
              onPress={() => {
                setPopupContentItems(1);
              }}
              color="warning"
              style={{ flex: 1 }}
            />
            <Button
              title="Close"
              onPress={() => setIsPopupOpen(false)}
              color="primary"
              style={{ flex: 1 }}
            />
          </View>
        </Popup>

        {/* Select Menu Demo */}
        <SelectMenu
          open={isSelectOpen}
          onClose={() => setIsSelectOpen(false)}
          value={selectedValue}
          onChange={setSelectedValue}
          options={selectOptions}
          label="Choose an option"
          helperText="Select one of the available options"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Display;
