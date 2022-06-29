import { FlatList, Image, StyleSheet } from "react-native";
import useSWR from "swr";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function TabOneScreen({ navigation }: RootTabScreenProps<"TabOne">) {
  const { data, isValidating, error } = useSWR("https://fakestoreapi.com/products", fetcher);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fake Store</Text>

      {isValidating ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={{
                width: "100%",
                maxWidth: 170,
                height: 170,
                padding: 10,
              }}
            >
              <Image source={{ uri: item?.image }} style={{ height: "75%" }} resizeMode="contain" />
              <Text numberOfLines={2} style={[styles.title, { textAlign: "center", fontSize: 13, marginTop: 5 }]}>
                {item?.title}
              </Text>
            </View>
          )}
          numColumns={2}
          keyExtractor={(item, index) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
