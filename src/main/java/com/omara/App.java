package com.omara;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;
import javafx.scene.text.Font;
import javafx.stage.Stage;

/**
 * JavaFX App
 */
public class App extends Application {

    private static Scene scene;
    private static Button button;

    @Override
    public void start(Stage primaryStage) throws Exception {
        primaryStage.setTitle("SVG 4 Me");
        button = new Button();
        Font arial = new Font("arial", 20);
        button.setFont(arial);

        button.setText("Switch to Secondary");

        StackPane layout = new StackPane();
        layout.getChildren().add(button);

        // scene = new Scene(loadFXML("primary"), 640, 480);
        scene = new Scene(layout, 300, 250);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    // static void setRoot(String fxml) throws IOException {
    // scene.setRoot(loadFXML(fxml));
    // }

    // private static Parent loadFXML(String fxml) throws IOException {
    // FXMLLoader fxmlLoader = new FXMLLoader(App.class.getResource(fxml +
    // ".fxml"));
    // return fxmlLoader.load();
    // }

    public static void main(String[] args) {
        launch(args);
    }

}