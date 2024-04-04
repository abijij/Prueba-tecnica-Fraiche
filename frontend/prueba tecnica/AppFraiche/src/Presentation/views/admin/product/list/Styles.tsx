import { StyleSheet } from "react-native";
import { MyColors } from "../../../../theme/AppTheme";

const ClientProductDetailStyles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal:16
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
    color: '#000',
  },
  searchButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CC3E9',
    borderRadius: 20,
  },
  imageSearch: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  defaultImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  defaultImage: {
    width: 200,
    height: 200,
  },
  noResultsText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ClientProductDetailStyles;
