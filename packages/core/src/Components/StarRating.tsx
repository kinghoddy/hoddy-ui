import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useColors } from "../hooks";
import { RatingInputProps, RatingStarsProps } from "../types";
import Button from "./Button";
import { Popup } from "./Popup";
import Typography from "./Typography";

export const RatingStars: FC<RatingStarsProps> = ({
  rating = 0,
  size = 16,
}) => {
  const colors = useColors();

  const styles = ScaledSheet.create({
    root: {
      flexDirection: "row",
      alignItems: "center",
    },
  });
  return (
    <View style={styles.root}>
      {[...Array(Math.floor(rating))].map((_, index) => (
        <Ionicons key={index} name="star" size={size} color="#FFD700" />
      ))}
      {[...Array(5 - Math.floor(rating))].map((_, index) => (
        <Ionicons
          key={index}
          name="star"
          size={size}
          color={colors.textSecondary.light}
        />
      ))}
    </View>
  );
};

export const RatingInput: FC<RatingInputProps> = ({
  onSubmit: _onSubmit,
  rating = 0,
  size = 16,
}) => {
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [rate, setRate] = useState(0);
  const colors = useColors();
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const styles = ScaledSheet.create({
    root: {
      flexDirection: "row",
      alignItems: "center",
    },
    inputCon: {
      marginBottom: "20@vs",
      backgroundColor: colors.white[3],
      padding: "15@ms",
      borderRadius: 20,
    },
    input: {
      fontSize: "16@ms",
      color: colors.dark.main,
      height: "100@vs",
    },
  });

  useEffect(() => {
    setRate(rating);
  }, [rating]);
  const onRate = (index: number) => {
    setRate(index + 1);
    Haptics.selectionAsync();

    setTimeout(() => {
      setShowReviewsModal(true);
    }, 500);
  };

  const onSubmit = async () => {
    setLoading(true);
    setShowReviewsModal(false);
    _onSubmit && (await _onSubmit({ rating: rate, review }));
    setLoading(false);
  };
  return (
    <>
      <View style={styles.root}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          [...Array(5)].map((_, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              onPress={() => {
                onRate(index);
              }}
            >
              <Ionicons
                style={{ marginLeft: 10 }}
                name={index < rate ? "star" : "star-outline"}
                size={size}
                color={colors.primary.light}
              />
            </TouchableOpacity>
          ))
        )}
      </View>
      <Popup
        sheet
        open={showReviewsModal}
        onClose={() => {
          setShowReviewsModal(false);
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <RatingStars rating={rate} size={24} />
        </View>
        <Typography
          align="center"
          fontWeight={700}
          variant="h5"
          gutterBottom={20}
        >
          Add to your review
        </Typography>

        <View style={styles.inputCon}>
          <TextInput
            style={styles.input}
            multiline
            value={review}
            onChangeText={(text) => setReview(text)}
            placeholder="Type review here.."
          />
        </View>
        <Button
          gutterBottom={40}
          title="Submit Review"
          loading={loading}
          disabled={loading}
          onPress={() => {
            onSubmit();
          }}
        />
      </Popup>
    </>
  );
};
