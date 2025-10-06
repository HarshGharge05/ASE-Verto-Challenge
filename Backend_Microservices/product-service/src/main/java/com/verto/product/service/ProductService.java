package com.verto.product.service;

import com.verto.product.dto.ProductRequest;
import com.verto.product.dto.ProductResponse;
import com.verto.product.model.Product;
import com.verto.product.repository.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class ProductService {

    @Value("${file.upload-dir:uploads/productImages}")
    private String uploadsDir;

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductResponse createProduct(ProductRequest productRequest) throws IOException {

        String imageId = null;

        if (productRequest.image() != null && !productRequest.image().isEmpty()){
            imageId = saveImage(productRequest.image());
        }

        Product product = Product.builder()
                .skuCode(productRequest.skuCode())
                .name(productRequest.name())
                .imageId(imageId)
                .description(productRequest.description())
                .price(productRequest.price())
                .build();

        productRepository.save(product);
        log.info("Product Created Successfully");

        return new ProductResponse(product.getId(), product.getSkuCode(), product.getName(), product.getImageId(), product.getDescription(), product.getPrice());
    }

    private String saveImage(MultipartFile file) throws IOException {

        String uuid = UUID.randomUUID().toString();
        String originalFileName = file.getOriginalFilename();

        String extension = "";
        if (originalFileName != null && originalFileName.contains(".")){
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }

        String newFileName = uuid + extension;

        Path folderPath = Paths.get(uploadsDir);
        Files.createDirectories(folderPath);

        Path filePath = folderPath.resolve(newFileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return newFileName;
    }

    public List<ProductResponse> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(product -> new ProductResponse(product.getId(), product.getSkuCode(), product.getName(), buildImageUrl(product.getImageId()), product.getDescription(), product.getPrice()))
                .toList();
    }

    private String buildImageUrl(String imageId){
        if (imageId == null) return null;
        return "http://localhost:8080/images/" + imageId;
    }
}
