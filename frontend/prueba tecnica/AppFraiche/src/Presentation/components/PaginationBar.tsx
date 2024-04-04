import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface PaginationBarProps {
  totalPages: number;
  onPageChange: (page: number) => void;
  visiblePages?: number;
}

export const PaginationBar = ({
  totalPages,
  onPageChange,
  visiblePages = 10,
}: PaginationBarProps) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const [selectedPage, setSelectedPage] = useState(1);
  const [visiblePageRange, setVisiblePageRange] = useState([1, visiblePages]);

  const handlePageChange = (page: number) => {
    setSelectedPage(page);
    onPageChange(page);
  };

  useEffect(() => {
    // Actualizar el rango de páginas visibles cuando se cambia la página seleccionada
    const startPage = Math.max(1, selectedPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);
    setVisiblePageRange([startPage, endPage]);
  }, [selectedPage, totalPages, visiblePages]);

  const goToFirstPage = () => {
    handlePageChange(1);
  };

  const goToLastPage = () => {
    handlePageChange(totalPages);
  };

  return (
    <View style={styles.paginationContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollViewContent}
      >
        {visiblePageRange[0] > 1 && (
          <TouchableOpacity onPress={goToFirstPage} style={styles.pageButton}>
            <Text style={styles.pageText}>&lt;&lt;</Text>
          </TouchableOpacity>
        )}
        {pages.slice(visiblePageRange[0] - 1, visiblePageRange[1]).map((page) => (
          <TouchableOpacity
            key={page}
            onPress={() => handlePageChange(page)}
            style={[
              styles.pageButton,
              { backgroundColor: page === selectedPage ? '#8EC306' : 'transparent' },
            ]}
          >
            <Text style={styles.pageText}>{page}</Text>
          </TouchableOpacity>
        ))}
        {visiblePageRange[1] < totalPages && (
          <TouchableOpacity onPress={goToLastPage} style={styles.pageButton}>
            <Text style={styles.pageText}>&gt;&gt;</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    marginTop: 20,
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  pageText: {
    color: 'black',
    fontSize: 16,
  },
});
