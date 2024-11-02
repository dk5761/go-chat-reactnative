import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { User } from "@/state/queries/users/users";
import { format } from "date-fns";
import Text from "../ui/Text";
import { Feather } from "@expo/vector-icons";

type Props = {
  userData: User;
};

const UserCard = ({ userData }: Props) => {
  const { styles } = useStyles(stylesheet);

  const last = format(userData.last_login, "dd-MM-yyyy");

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          style={{
            width: 45,
            aspectRatio: 1,
          }}
          src={
            "https://go-chat-dk5761.s3.ap-south-1.amazonaws.com/user.png?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEsaCmFwLXNvdXRoLTEiSDBGAiEAm%2BqGKoa9OCAYu8iER4hvYHNUO0BPLeXzWZAm%2FY1n3EwCIQDIoIIGuucDqqveV76yVA7cpPmO8E3Mu3GhVX%2BuwnXluCrUAwjE%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDU4NTc2ODE1NzQ5MiIM0pW2%2BA0B9Ta6pLxGKqgDDw3kJU2%2FX6fSUTWrDplGrQowUAz4RLULkDG9KuirjzglD5Dt1lLVmWXZSWsOR9UPaxAvBw1D92qDOEcPaMBtbwXWh%2F1uPAYGkKNn9%2FuhzJvu1LYGOIkRI4mAhs9m14mYMbhwtD6JA1wqU3%2BJGhsQgnssg23u%2F1h4HKOTNViyVp2Ymi8QpjmstnW26SzZyMXsJW3%2FKXLUAq5fWdNhyuXSRpt0f2GshLCvnEAV7JvRviaSWaoWUXHVvHbj3R4Ofjq4%2FfZEuMO%2FUivd04yuPWprfHD%2FKGaiPwqVCZTHIU6Iy29QlcK0GLHMfjBEIvxwANvkypXylbetqEOiS6GtR0bqqvrI6fDEFppBQQxdwO5Egmt8rt56vLrgEku3LEoK3eifyKU%2Fl%2BEjwDop8D9bM%2BWU6QH8BQzL%2F%2BSV17wTGsV%2BkhaMg%2BdpEyz%2FK4SnwtMObXvn5cNh2AI7fO%2B1XDG1TP0Y8MpRDPLCt3BYK%2BKD04Gi6ZAE%2FgLCMiHYmW3JCyo8i4q2q%2BoBkZst7JQ4ktTkPjvc98TnnFtR0lTDL%2FT3%2F9KZWACG%2B%2B1kaj3EqzDC85m5BjrjAuZU6Eo4AHZ0iqM8pRQjzIaAJHGH2YKy2ETXtKCae66AvAwG%2FcqSj9To4n97F7t6tYNfWoRoH0gBHpX6EfWJtzny1p7c%2BqD3SMUp6h%2B9ASArAxto1Y%2B%2BeKstJ6xWkFBQrfGDUvg2ZXugsuiJZffDY0alvgvd1aY9S3Wy%2FaxJ0qCYYlmRIUAfgbR6rvDbpuZFI7raHx8zGsxIS8%2FDw%2BtdgHFnSX6MpZw2W4U4MxylzuOZUBeZufBkm6AjvcXxkpjIEbhROeetq8Hgz%2Fts%2FwKFjPSMTG9oeg5GkdSeqknEr%2BvS%2BZxkTR0cs7ozhXSdm%2F83XespurXAB6Yux4Houx2qbPOmoNU%2FZlsmamUawJT%2Bc4iEiL0dl6gCdi3cM2m9f0iTHfz4cSVPeDyhTB4O5jM6YWfn02JiJPkd8qiu3VqpFx8dqm6ttilRiKRljt%2FQuQFAul6dK4k3%2BJJKmBGmj32pyVCXp4w%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAYQYUAYE2FT6A6IZW%2F20241102%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241102T191440Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=8b0b0b48f0444ee2cf449eac5d9d4ae479dbcd023fa0b19049c9b641f491256e"
          }
        />
        <View>
          <Text weight="semiBold" size="xs">
            {userData.username}
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity>
          <Feather name="user-plus" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserCard;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: theme.margins.lg,
    backgroundColor: theme.colors.background,
    borderRadius: theme.margins.md,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 70,
  },
  left: {
    // borderWidth: 2,
    // borderColor: "red",
    flexDirection: "row",
    gap: 8,
    paddingRight: theme.margins.md,
  },
  right: {
    // borderWidth: 2,
    // borderColor: "green",
    alignItems: "flex-end",
    justifyContent: "center",
  },
}));
